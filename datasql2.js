const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'Localhost',
    user: 'root',
    password:'root',
    database:'bhaskar'
});

connection.connect((err)=>{
    if (err) {
        console.error ('Error connecting '+ err.stack);
        return;
    }
    console.log('Connected as Id'+ connection.threadId);

    connection.query('SHOW TABLES',(error,results)=>{
        if (error)throw error;
        console.log ('Tables:');
        results.forEach( table =>{
            
            const tableName =Object.values(table)[0];
            console.log(tableName);

        });

        connection.end();

    });
});