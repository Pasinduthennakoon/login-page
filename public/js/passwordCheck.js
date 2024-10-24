var password = false;

function validatePassword(){
    
  var InputValue = $("#password-input").val();
  var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
  console.log(InputValue);
   
   if(!regex.test(InputValue)) {
        console.log("incorrect pw");
        password = false;    
   }else{
      console.log("correct pw");
      password = true;
   }

   console.log(password);
   exports = password;
}

