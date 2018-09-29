//the main function must occur after the page is loaded, hence being inside the window.onload event handler.
window.onload = function(){
    var mainForm = document.getElementById("mainForm");

    //all inputs with the class required are looped through
    var requiredInputs = document.querySelectorAll(".required");
    for (var i=0; i < requiredInputs.length; i++){
      requiredInputs[i].onfocus = function(){
        this.style.fontWeight = "bold";
        this.style.backgroundColor = "green";
      }
	    requiredInputs[i].onblur = function(){
          this.style.fontWeight = "normal";
	        this.style.backgroundColor = "#FFFFFF";
	        this.parentNode.style.backgroundColor = "#FFFFFF";
       }
     }

    //on submitting the form, "empty" checks are performed on required inputs.
    mainForm.onsubmit = function(e){
     	//empty check
      console.log(requiredInputs);
      var empty = false;
      for (let i=0; i < requiredInputs.length; i++){
        if (requiredInputs[0].value == ""|| requiredInputs[1].value == ""|| requiredInputs[2].checked == false){
            empty = true;
        }else{
            empty = false;
            break;
        }
        if (requiredInputs[i].value == "" && requiredInputs[i].type == "text"){
            requiredInputs[i].parentNode.style.backgroundColor = "red";
        }
        if (requiredInputs[i].value == "" && requiredInputs[i].nodeName == "TEXTAREA"){
            requiredInputs[i].style.backgroundColor = "red";
        }
        if (requiredInputs[i].checked == false && requiredInputs[i].type == "checkbox"){
            requiredInputs[i].parentNode.style.backgroundColor = "red";
        }

      }
      if (empty){
        return false;
		 }else{
				alert('You have submitted the form');
			}
		}
}
