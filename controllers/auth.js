const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var checkIsValidpass = false;

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.register = (req, res) =>{
    console.log(req.body);

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const passwordconfirm = req.body.cpassword;
    const type = req.body.user_type;

    //check the is password strong?
    var InputValue = password;
        var regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        console.log(InputValue);
         
         if(!regex.test(InputValue)) {
              console.log("incorrect pw");
              checkIsValidpass = false;    
         }else{
            console.log("correct pw");
            checkIsValidpass = true;
         }
    //end
    
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if(error){
            console.log(error);
        }

        if(results.length > 0){
            return res.render('register', {
                message: 'That email is already in use'
            })
        }else if(password !== passwordconfirm){
            return res.render('register', {
                message: 'Password do not match'
            });
        }
        
        if(checkIsValidpass == true){// is password  strong?
            //encrypt passwords
            let hashedpassword = await bcrypt.hash(password, 8);
            //console.log(hashedpassword);

            db.query('INSERT INTO users SET ?', {name: name, email:email, password: hashedpassword, user_type: type}, (error, results) =>{
                if(error){
                    console.log(error);
                }else{
                    console.log(results);
                    return res.render('register', {
                        message: 'User registered'
                    });
                }
            })
        }else{
            return res.render('register', {
                message: 'password not strong'
            })
        }    
    });

}