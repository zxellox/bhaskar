let mysql = require('mysql2');
let con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:'root',
    database:'bhaskar'
});
con.connect(function(err){
    if (err) throw err;
    console.log ("connected");

    let sql = "INSERT INTO employee (name,address) VALUES ('Annya', 'siliguri') ,('Joyee','siliguri') ,('Priyanka','Matigara')";
    

    con.query(sql,function(err,result){
        if (err) throw err;
        console.log ("1 recored insert");
        console.log (result);
    });
});
