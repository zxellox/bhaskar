const mysql = require("mysql2");

let db_con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:'bhaskar'
});

db_con. connect((err)=>{
    if (err){
        console.log ("database connected failed !!!",err);
    }else{
        console.log ( "connected to database");
    }

});


module.exports=db_con;