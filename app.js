const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");

const app = express();

dotenv.config ({ path: './.env'});
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.set('view engine','hbs'); 

db.connect( (error) =>{
    if(error){
        console.log(error)
    }else{
        console.log("MYSQL connected..")
    }
})

app.get("/",(req,res) => {
    res.render("index")
});

app.listen(5000, () => {
    console.log("server started on port 5000");
})