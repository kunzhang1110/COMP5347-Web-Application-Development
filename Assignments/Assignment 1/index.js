window.onload = function () {
  //load Local JSON
  const info_list = [
    {
        "img":"images/01.jpg",
        "title":"The Arts: A Visual Encyclopedia",
        "authors":"DK",
        "year":"2017",
        "price":"13.99",
        "publisher":"DK Children",
        "category":"Art"
    },
    {
        "img":"images/11.jpg",
        "title":"The Lost Art of Reading Nature's Signs: Use Outdoor Clues to Find Your Way, Predict the Weather, Locate Water, Track Animals―and Other Forgotten Skills (Natural Navigation)",
        "authors":"Tristan Gooley",
        "year":"2015",
        "price":"11.52",
        "publisher":"The Experiment",
        "category":"Art"
    },
    {
        "img":"images/02.jpg",
        "title":"The Scientists: A History of Science Told Through the Lives of Its Greatest Inventors",
        "authors":"John Gribbin",
        "year":"2004",
        "price":"16.00",
        "publisher":"Random House Trade Paperbacks",
        "category":"Science History"
    },
    {
        "img":"images/22.jpg",
        "title":"The Invention of Science: A New History of the Scientific Revolution",
        "authors":"David Wootton",
        "year":"2016",
        "price":"7.75",
        "publisher":"Harper Perennial",
        "category":"Science History"
    },
    {
        "img":"images/03.jpg",
        "title":"The Hunger Games",
        "authors":"Suzanne Collins",
        "year":"2010",
        "price":"7.55",
        "publisher":"Scholastic Press",
        "category":"Action and Adventure"
    },
    {
        "img":"images/33.jpg",
        "title":"Coyote Peterson’s Brave Adventures: Wild Animals in a Wild World",
        "authors":"Coyote Peterson",
        "year":"2017",
        "price":"13.44",
        "publisher":"Mango",
        "category":"Action and Adventure"
    },
    {
        "img":"images/04.jpg",
        "title":"Dr. A's Habits of Health: The Path to Permanent Weight Control & Optimal Health",
        "authors":"Wayne Scott Anderse",
        "year":"2010",
        "price":"24.43",
        "publisher":"Habits of Health Press",
        "category":"Health"
    },
    {
        "img":"images/44.jpg",
        "title":"The New Health Rules: Simple Changes to Achieve Whole-Body Wellness",
        "authors":"Frank Lipman M.D.",
        "year":"2016",
        "price":"8.98",
        "publisher":"Artisan",
        "category":"Health"
    },
    {
        "img":"images/05.jpg",
        "title":"2084",
        "authors":"Mason Engel",
        "year":"2017",
        "price":"12.50",
        "publisher":"CreateSpace Independent Publishing Platform",
        "category":"Science Fiction"
    },
    {
        "img":"images/55.jpg",
        "title":"God's Ground: Compared to the settlement of space, all other forms of human endeavor shrink to insignificance",
        "authors":"John Brophy",
        "year":"2017",
        "price":"6.99",
        "publisher":"John R Brophy",
        "category":"Science Fiction"
    }
];

  const select_category = document.querySelector("select#category");
  const tbody = document.querySelector("#listBox table tbody");
  var all_rows = tbody.childNodes;

  //render searchBox select#category and listBox's rows
  var categoryList = [];
  for (let i=0; i<info_list.length; i++){
    //render searchBox select#category
    if (!categoryList.includes(info_list[i].category)){//if not in categoryList
      categoryList.push(info_list[i].category);
      let new_category = document.createElement("option");
      new_category.innerHTML = info_list[i].category;
      new_category.setAttribute("value", info_list[i].category);
      select_category.appendChild(new_category);
      }
    //render listBox's rows
    let new_row = document.createElement("tr");
    new_row.innerHTML = "<td><input type=\"checkbox\" class=\"checkbox\"></td>" +
                        "<td><img src=\"" + info_list[i].img +"\" height=\";100\"; width=\"80\"></td>"+
                        "<td>" + info_list[i].title +"</td>"+
                        "<td>" + info_list[i].authors +"</td>"+
                        "<td>" + info_list[i].year +"</td>"+
                        "<td>" + info_list[i].price +"</td>"+
                        "<td>" + info_list[i].publisher +"</td>"+
                        "<td>" + info_list[i].category +"</td>";
    new_row.setAttribute("id", "row"+i);
    tbody.append(new_row);
  }
  // extra test category
  {let new_category = document.createElement("option");
  new_category.innerHTML = "Test";
  new_category.setAttribute("value",new_category.innerHTML);
  select_category.appendChild(new_category);}
  document.querySelector("#empty_category").style.display = "none"; //hide #empty_category row 
  
  //search and hightlight
  const search_textbox = document.querySelector("#search_textbox");
  const search_button = document.querySelector("#search_button");
  search_button.onclick = ()=>{
    let input_value = search_textbox.value;
    let match = 0; //match counter
    for (let i=0; i<info_list.length; i++){
      let current_row = document.querySelector("#row"+i);
      if (input_value.trim()===info_list[i].title){
        match += 1;
        if(current_row.style.display == "none"){
            alert("Result found in Category: <"+info_list[i].category +">");
        }else{
          current_row.style.backgroundColor ="yellow";          
        }
      }else{
        current_row.style.backgroundColor ="#FFFFFF";
      }
    }
    if (match == 0){
      alert("No Match Found.");
    }
  }

  //filter
  var filter_button = document.querySelector("#filter_button");
  filter_button.onclick = ()=>{
    reset_checked_state(all_rows)
    let match = 0; //match counter
    for (let i=0; i<info_list.length; i++){
      let current_row = document.querySelector("#row"+i);
      if (select_category.value=="Category"){//reset filter: display all rows
        for (let i=0; i<info_list.length; i++){
          document.querySelector("#row"+i).style.display = "";
        }
        break;
      }
      if (select_category.value==info_list[i].category){
        current_row.style.display = "";
        match += 1;
      }else{
        current_row.style.display = "none" //hide rows
      }
    }
 
    if (match == 0 && select_category.value != "Category"){// if empty category

        document.querySelector("#empty_category").style.display = "";
               console.log(document.querySelector("#empty_category"))
    }else {
        document.querySelector("#empty_category").style.display = "none";
    }
  }

  //add to cart
  var cart_items = [];  //items in cart
  var add_button = document.querySelector("#add_button");
  var cart_number = document.querySelector("#cart_number");
  add_button.onclick = ()=>{
    for (let i=1; i<all_rows.length; i++){//skip the first child
      if(all_rows[i].querySelector(".checkbox").checked == true){   // allow duplicate items
        cart_items.push(all_rows[i])
      }
    }
    cart_number.innerHTML = "("+ cart_items.length + ")";
  }

  //reset cart
  var reset_button = document.querySelector("#reset_button");
  reset_button.onclick = ()=>{
    if(confirm("This will Empty Your Shopping Cart. Proceed?")){
      cart_items = [];
      cart_number.innerHTML = "("+ cart_items.length + ")";
      alert("Your Shopping Cart is Empty!");
      reset_checked_state(all_rows);
    }else{
      alert("Operation Cancelled.");
    }
  }
}

// clear all checked state
function reset_checked_state(rows){
  for (let i=1; i<rows.length; i++){//reset all checked state
    rows[i].querySelector(".checkbox").checked = false;   
  }    
}