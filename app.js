const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require("dotenv");
const session = require("express-session");
const bodyparser = require("body-parser");
const { count } = require("console");
const { request } = require("http");
const bcrypt = require('bcryptjs');
const encoder = bodyparser.urlencoded();

dotenv.config ({ path: './.env'});

const app = express();



const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine', 'hbs');

db.connect( (error) =>{
    if(error){
        console.log(error)
    }else{
        console.log("MYSQL connected..")
    }
})


//Define Routers
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


app.listen(5001, ()=>{
    console.log("server started on port 5001");
})

// login
app.get("/",function(req,res){
    res.sendFile(__dirname + "/views/index");
})

app.post("/",encoder,function(req,res){

    var email = req.body.email;
    var password = req.body.password;


    //e-mail check
    db.query('SELECT *FROM users WHERE email = ?', [email], async (error,results)=>{
        console.log("dataset");
        console.log(results);
        console.log("given password");
        console.log(password);
        
        if (results.length > 0 ) {


            //password check
            for(var i = 0; i < results.length ; i++){

                console.log("stored database hash password");
                console.log(results[i].password);

                
                    let isEqual = await bcrypt.compare(password , results[i].password)// compare hash password and we given password

                    if(isEqual){
                        res.redirect("/Home");
                        console.log("login successful");
                    }else{
                        console.log("password missmatch");
                        return res.render('index', {
                         message: 'Wrong password'
                        })
                    }
            }

                    
        }else{
            console.log("login faild");
            return res.render('index', {
                message: 'User not found'
            })
        }
        res.end();
    });


})