const express = require("express");
const mysql = require("mysql2");

const app = express();

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bhaskar"
});

// Connect to DB
con.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL");

    // Create table once
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS student (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            address VARCHAR(255),
            class INT,
            stream VARCHAR(255)
        )
    `;

    con.query(createTableQuery, (err) => {
        if (err) throw err;
        console.log("Table ready");
    });
});

// Route to insert data
app.get("/insert", (req, res) => {
    const sql = `
        INSERT INTO student (name,address,class,stream)
        VALUES 
        ('Annya', 'siliguri',12,'commerce'),
        ('Joyee','siliguri',12,'commerce'),
        ('Priyanka','Matigara',12,'arts')
    `;

    con.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Insert failed");
        }
        res.send("Records inserted successfully");
    });
});

// Basic route
app.get("/", (req, res) => {
    res.send("Server running...");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});