console.log("connect validate.js")

// //show password toggle
let showPasswordBtn = document.querySelector('.show-password');
let showCPasswordBtn = document.querySelector('.cpass');

let passwordInp = document.getElementById('password-input');
let cPasswordInp = document.getElementById('cPassword-input');

let passwordChecklist = document.getElementsByClassName('list-item');
let showPassword = false 


//password icon change and change type 
showPasswordBtn.addEventListener("click", function(){
    if( showPassword == false){
        passwordInp.setAttribute("type", "text");
        showPasswordBtn.classList.add("fa-eye-slash");
        showPasswordBtn.classList.remove("fa-eye");
        showPassword = true;
    }else{
        passwordInp.setAttribute("type", "password");
        showPasswordBtn.classList.remove("fa-eye-slash");
        showPasswordBtn.classList.add("fa-eye");
        showPassword = false;
    }
});

//confirmPassword icon change and change type 
showCPasswordBtn.addEventListener("click", function(){
    if( showPassword == false){
        cPasswordInp.setAttribute("type", "text");
        showCPasswordBtn.classList.add("fa-eye-slash");
        showCPasswordBtn.classList.remove("fa-eye");
        showPassword = true;
    }else{
        cPasswordInp.setAttribute("type", "password");
        showCPasswordBtn.classList.remove("fa-eye-slash");
        showCPasswordBtn.classList.add("fa-eye");
        showPassword = false;
    }
});

//strong password validation
let validationRegex = [
    { Regex: /.{8,}/ },//min 8 letters
    { Regex:/[0-9]/ },//number from 0-9
    { Regex:/[a-z]/ },//letter from a-z(lowercase)
    { Regex:/[A-Z]/ },//letter from A-Z(uppercase)
    { Regex:/[^A-Za-z0-9]/ }//special characters
]

passwordInp.addEventListener('keyup', ()=>{
    validationRegex.forEach((item, i) =>{

        let isValid = item.Regex.test(passwordInp.value);

        if(isValid){
            passwordChecklist[i].classList.add('checked');
        }else{
            passwordChecklist[i].classList.remove('checked');
        }

    })
})


// function checkIsVal(){
//   console.log("onchange work");
//   passwordInp.value = passwordInp.value.toUpperCase();
//   if(isValid){
//     return res.render('register', {
//         message: 'Strong Password'
//     });
//     }else{
//         return res.render('register', {
    //             message: 'Password Not Strong'
    //         });
    //     }
// }