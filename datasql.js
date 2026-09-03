const express = require("express");
const database = require("./sqlConnection");

const app = express();

app.get("/", (req, res) => {

    let tableName = 'employee';

    let query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        name VARCHAR(255),
        address VARCHAR(255)
    )`;

    database.query(query, (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Table Creation Failed");
        }
        return res.send(`Successfully created table - ${tableName}`);
    });
});

app.listen(5000, () => {
    console.log("Server is up and running on 5000...");
});