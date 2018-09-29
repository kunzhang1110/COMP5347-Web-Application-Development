// load google chart package
google.charts.load('current', {packages: ['corechart']});

$(function() {
  // utility functions
  function getChartOptions(title){
    return{
      'title':title,
      'width':1200,
      'height':800
    };
  }
  function drawPie(data,selector){
    // Revision number distribution by year and by user
    var graphData = new google.visualization.DataTable();
    graphData.addColumn('string', 'User');
    graphData.addColumn('number', 'Number');
    $.each(data, function(key, val) {
        console.log(val._id.usertype, val.count);
        graphData.addRow([val._id.usertype, val.count]);
    });
    let options = getChartOptions("Distribution by User Type");
    let chart = new google.visualization.PieChart($(selector)[0]);
    chart.draw(graphData, options);
  }

  function drawColumn(data, selector){
    var graphData = new google.visualization.DataTable();
    graphData.addColumn('string', 'Year');
    graphData.addColumn('number', 'Administrator');
    graphData.addColumn('number', 'Anonymous');
    graphData.addColumn('number', 'Bot');
    graphData.addColumn('number', 'Registered User');
    console.log(data)
    $.each(data, function(key, val) {
    graphData.addRow([val._id.year,val.admin,val.anonymous,val.bot,val.registered]);
  });
    let options = getChartOptions("Distribution of User Types by Year");
    let chart = new google.visualization.ColumnChart($(selector)[0]);
    chart.draw(graphData, options);
  }

  function isoToNormal(isoString){//ISOString to locale readable Date
    let isoDate = new Date(isoString);
    return isoDate.toLocaleString();
  }

  //navigation bar links
  $("#overview_link").click(function(event){
    event.preventDefault();
    $("#overview_section").css("display","block");
     $("#individual_section").css("display","none");
     $("#article_section").css("display","none");
  });

  $("#individual_link").click(function(event){
    event.preventDefault();
    $("#overview_section").css("display","none");
     $("#individual_section").css("display","block");
     $("#article_section").css("display","none");
  });

  $("#article_link").click(function(event){
    event.preventDefault();
    $("#overview_section").css("display","none");
     $("#individual_section").css("display","none");
     $("#article_section").css("display","block");
  });


  // *****************************
  // Overview
  // *****************************
  var revisionLimit = 3; //default limit is 3

  function renderRevisionExtremum(selector, options){
    //render highest/lowest revision
    $.get('analytic/findExtremumRevision',options, data=>{
      $(selector).empty(); //empty current content
      $(selector).append(`
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col"> Revisions</th>
            </tr>
          </thead>
        <tbody>
      `); //create table head
      for(let i=0;i<data.length;i++){
      $(selector+" tbody").append(`
        <tr>
          <td>${data[i]._id.title}</td>  <td>${data[i].count}</td>
        </tr>`);
      }
      $(selector).append(`
        </tbody>
      </table>
      `);
    });
  }

  function renderUserGroupExtremum(selector, options){
      //render largest/smallest group of registered users
    $.get('analytic/findExtremumRegisterUsersGroup',options, data=>{
      $(selector).empty(); //empty current content
      $(selector).append(`
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col"> Revisions</th>
            </tr>
          </thead>
        <tbody>
      `); //create table head
      let prevCount = data[0].count;
      for(let i=0;i<data.length;i++){
        if (data[i].count==prevCount){//if there are mutiiple maximum/minimum
          $(selector+" tbody").append(`
            <tr>
              <td>${data[i]._id.title}</td>  <td>${data[i].count}</td>
            </tr>`);
        }else{
          break;
        }
      }
      $(selector).append(`
        </tbody>
      </table>
      `);
    });
  }

  function renderHistoryExtremum(selector, options){
    //render Top 3 longest/shortest group articles
    $.get('analytic/findExtremumHistory',options, data=>{
      $(selector).empty(); //empty current content
      $(selector).append(`
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Creation Time</th>
            </tr>
          </thead>
        <tbody>
      `); //create table head
      for(let i=0;i<data.length;i++){
        data[i].firstEditTime = isoToNormal(data[i].firstEditTime);
        $(selector+" tbody").append(`
          <tr>
            <td>${data[i]._id.title}</td>  <td>${data[i].firstEditTime}</td>
          </tr>`);
      }
      $(selector).append(`
        </tbody>
      </table>
      `);
    });
  }

  $("#revisionLimitButton").click(function(){
    let revisionLimit = parseInt($("#revisionLimitTextbox").val());
    renderRevisionExtremum("#highestRevision", {sortDirection:-1,displayLimit:revisionLimit});
    renderRevisionExtremum("#lowestRevision", {sortDirection:1,displayLimit:revisionLimit});
  });

  //highest
  renderRevisionExtremum("#highestRevision", {sortDirection:-1,displayLimit:revisionLimit});

  //lowest
  renderRevisionExtremum("#lowestRevision", {sortDirection:1,displayLimit:revisionLimit});

  //largest
  renderUserGroupExtremum("#largestGroupUser", {sortDirection:-1});

   //smallest
   renderUserGroupExtremum("#samllestGroupUser", {sortDirection:1});

  //longest
  renderHistoryExtremum("#longestHistory", {sortDirection:-1,displayLimit:3});

  //shortest
  renderHistoryExtremum("#shortestHistory", {sortDirection:1,displayLimit:3});

  //draw charts ------------
  $("#usertypeDistributionPie").click(function(event){
    event.preventDefault();
    $.get('analytic/findUsertypeDistribution', data=>{
        drawPie(data, "#overviewChart");
      });
  });

  $("#yearDistributionColumn").click(function(event){
    event.preventDefault();
    $.get('analytic/findUsertypeDistributionByYear', data=>{
        drawColumn(data, "#overviewChart");
      });
    });


  // *****************************
  // INDIVIDUAL ANALYSIS
  // *****************************
  $.get('analytic/getAllTitles', data=>{
      $.each(data, (index,row)=>{
        var display_content=`<option value="${row._id.title}">${row._id.title}  (${row.count})</option>`;
        $("#titleList").append(display_content);
      });
  });

  var articleName;
  $("#articleSelectButton").click(function(event){
    var topUsers =[];
    event.preventDefault();
    articleName = $("#titleList")[0].value;//$("#titleList")[0] is the selected value

    // fetch updates from wikipedia
    $.get('analytic/updateArticle', {"title":articleName},data=>{
      let display_content ="";
      if (data.updatedLength == -1){
        display_content = "Fresh revisions. No request sent to Wiki."; // current version is less than 1 day olod
      }else if(data.updatedLength>0){
        display_content=`Update Download Count:${data.updatedLength}`;
      }else{//data.updatedLength == 0
        display_content = "No update available on Wiki";
      }
      $("#dataUpdateDisplay").html(display_content);
      // get top users for the selected article
      $.get('analytic/getArticleTopUsers', {"title":articleName}, data=>{
        $("#articleTopUsers").empty();
        $("#articleTopUsers").append(`
        <table class="table">
          <thead>
            <tr>
              <th scope="col">User Name</th>
              <th scope="col">Revisions</th>
            </tr>
          </thead>
        <tbody>
      `);

        $.each(data, (index,row)=>{
          topUsers.push(row._id.user);
          $("#articleTopUsers tbody").append(`
            <tr>
              <td>${row._id.user}</td>
              <td>${row.count}</td>
            </tr>`);
          });
        $("#userList").empty();

        for (let i in topUsers){
          display_content=`<option value="${topUsers[i]}">${topUsers[i]}  </option>`;
          $("#userList").append(display_content);
        }
      });
    });
  });

  // draw column chart for article distribution by year
  $("#articleDistributionYearColumn").click(function(event){
    event.preventDefault();
    $.get('analytic/findArticleDistributionYear',{"title":articleName}, data=>{
      drawColumn(data, "#individualChart");
    });
  });

  // draw pie char for article distribution by usertype
  $("#articleDistributionUsertypePie").click(function(event){
    event.preventDefault();
    $.get('analytic/findArticleDistributionUsertype',{"title":articleName}, data=>{
      drawPie(data, "#individualChart");
    });
  });


  $("#articleDistributionByUserColumn").click(function(event){
      event.preventDefault();
      let userName =$("#userList")[0].value;   //get user list value
      let options = getChartOptions("Article Revision Number Distribution by User by Year");
      $.get('analytic/findArticleDistributionByUser',{"title":articleName, "user":userName}, data=>{
        let graphData = new google.visualization.DataTable();
        graphData.addColumn('string', 'Year');
        graphData.addColumn('number', 'Revision');
        $.each(data, function(key, val) {
          graphData.addRow([val._id.year,val.count]);
        });
        var chart = new google.visualization.ColumnChart($("#individualChart")[0]);
        chart.draw(graphData, options);
  });
});

  // *****************************
  // ARTICLE ANALYSIS
  // *****************************
  $("#authorNameButton").click(function(event){
    event.preventDefault();

    let authorName = $("#authorNameText")[0].value;
    $.get('analytic/findUserAriticle', {"user":authorName}, data=>{
      //render table head
      $("#articleUserDisplay").empty();
      $("#articleUserDisplay").append(`
        <div class="row" id="articleUserDisplayHead">
          <div class="col-sm-3">User</div>
          <div class="col-sm-3">Article</div>
          <div class="col-sm-3">Revisions</div>
          <div class="col-sm-3"></div>
        </div>
      `);

      //render table body
      $.each(data, (index,row)=>{
        //render each row
        $("#articleUserDisplay").append(`
          <div class="row articleUserDisplayRow">
            <div class="col-sm-3">${row._id.user}</div>
            <div class="col-sm-3">${row._id.title}</div>
            <div class="col-sm-3">${row.count}</div>
            <div class="col-sm-3"><button type="button" class="btn" data-toggle="collapse" data-target="#row${index}">Show Time</button></div>
        </div>
        <div id="row${index}" class="collapse">
        </div>
      `);
        //render collapse timestamps
        row.timeStamps.sort();
        $.each(row.timeStamps, (inner_index,timestamp)=>{
          timestamp = isoToNormal(timestamp);
          $("#row"+index).append(`
              <div class="row articleUserDisplayInnerRow">
                <div class="col-sm-3">${inner_index+1}</div>
                <div class="col-sm-3">${timestamp}</div>
              </div>`);
        });
      }); // END render table body
    });
  });
});
