const express=require("express");
const app=express();


const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  database: "company"
}).promise();
app.get("/emp", async (req, res) => {

   const data = await pool.execute("SELECT * FROM users");
    console.log(data[0]); 
    res.json(data[0]);    

});


app.listen(3000,()=>{
    console.log("listening on port 3000");
    });
    
    