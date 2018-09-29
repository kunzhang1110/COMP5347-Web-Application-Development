$(function() {// The DOM is ready
    
  //login form
    $("#loginForm").submit(function(event){
      //post user login form
      event.preventDefault();

      $.ajax({//post form
        type: $(this).attr('method'),
        url: $(this).attr('action'),
        data: $(this).serialize(),
        success: function(res){
            if(res.loginStatus == false){
              $("#loginStatus").text("Username does not match password. Try again or Sign up.");   
            }else{
              window.location.href= "/analytic"; //redirect to analytic page GET
            }
        }
      })
    });
  
  //signup form 
    $("#signupForm").submit(function(event){
      //post user sign up form
      event.preventDefault();
      $.ajax({
        type: $(this).attr('method'),
        url: $(this).attr('action'),
        data: $(this).serialize(),
        success: function(res){
          console.log(res)
            if(res.registerStatus == false){
              $("#registerStatus").css("color", "red");
              $("#registerStatus").text("Sign up failed. Try again.");         
            }else{
              $("#registerStatus").css("color", "green");
              $("#registerStatus").text("Signed up successfully.");  
            }
        }
      })
    });
    
    
    
});