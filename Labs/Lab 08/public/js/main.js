google.charts.load('current', {packages: ['corechart']});

var options = {'title':"Composition of Earth's atmosphere  ",
        'width':400,
        'height':300};
var data 

function getDataTable(){
    graphData = new google.visualization.DataTable();
	graphData.addColumn('string', 'Element');
	graphData.addColumn('number', 'Percentage');
	$.each(data, function(key, val) {
		graphData.addRow([key, val]);
	})
    return graphData
}

function drawPie(){
   	graphData = getDataTable()
	var chart = new google.visualization.PieChart($("#myChart")[0]);
	chart.draw(graphData, options);
}

function drawBar(){
    graphData = getDataTable()
	var chart = new google.visualization.BarChart($("#myChart")[0]);
	chart.draw(graphData, options);
}


$(document).ready(function() {
    $.getJSON('/data',null, function(rdata) {
    	data = rdata
    }
    );
    
    $("#pie").click(function(event){
    	event.preventDefault(); //prevent default click action that links to /piechart
    	drawPie()
   	})

    $("#bar").click(function(event){
        event.preventDefault(); //prevent default click action that links to /piechart
        drawBar()
    })

});