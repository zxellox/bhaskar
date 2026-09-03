const express = require("express");
const mysql = require("mysql2");
const session = require("express-session");
const bcrypt = require("bcrypt");
const path = require("path");

const app = express();

//=========== middileware ==============
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/css",express.static(path.join(__dirname,"public","css")));
app.use("/js",express.static(path.join(__dirname,"public","js")));
app.use("/images",express.static(path.join(__dirname,"public","image")));

app.use(session({
    secret: "secretkey",
    resave:false,
    saveUninitialized:false,
    cookie: {
        secure:false,   // importent (must be false for localhost)
        httpOnly:true
    }
}))

//=========== databases ============
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:"root",
    database: "bhaskar"
});

db.connect(err => {
    if (err) throw err;
    console.log("mysql connected");
});

// ========== CREATE TABLES ==========

// Users table
const createUsersTable = `
CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255)
)
`;

db.query(createUsersTable, (err) => {
    if(err){
        console.log("Users table error:", err);
    }
    else{
        console.log("Users table created");
    }
});


// Products table
const createProductsTable = `
CREATE TABLE IF NOT EXISTS products(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    price INT,
    image VARCHAR(255)
)
`;

db.query(createProductsTable, (err) => {
    if(err){
        console.log("Products table error:", err);
    }
    else{
        console.log("Products table created");
    }
});


// Cart table
const createCartTable = `
CREATE TABLE IF NOT EXISTS cart(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT,

    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
)
`;

db.query(createCartTable, (err) => {
    if(err){
        console.log("Cart table error:", err);
    }
    else{
        console.log("Cart table created");
    }
});

//===========clean url get routes ============
app.get("/", (req , res) => {
   res.sendFile(path.join(__dirname, "views", "index.html"));
});
//login page
app.get("/login", (req,res) =>{
    res.sendFile(path.join(__dirname,"views", "login.html"));
});
//register page
app.get("/register", (req,res) =>{
    res.sendFile(path.join(__dirname,"views", "register.html"));
});


//api to fetch cart items for the loged in user
app.get("/get-cart", (req,res)=>{
    if (!req.session.userId) {
        // not logged in-return emty annay so frontend shows nothing
        return res.json([]) ;
     }

    const userId = req.session.userId;
     const query = `
         SELECT c.quantity ,  p.id AS product_id, p.name, p.price, p.image
         FROM cart c 
         JOIN products p ON c.product_id = p.id
         WHERE c.user_id = ?
    `;


    db.query(query,[userId], (err, results) => {
         if (err) {
             console.error("Eror fetching cart:",err);
             return res.json([]);
        }
        res.json(results);
     });

});

// Register user

app.post("/register", (req,res)=>{

    const {name,email,password} = req.body;


    const sql = 
    "INSERT INTO users(name,email,password) VALUES(?,?,?)";


    db.query(sql,
    [name,email,password],
    (err,result)=>{

        if(err){
            console.log(err);
            return res.send("Registration failed");
        }


        console.log("User inserted");
        res.redirect("/login");

    });

});

// ================= LOGIN USER =================
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], (err, results) => {

        if (err) {
            console.log(err);
            return res.send("Database Error");
        }

        if (results.length === 0) {
            return res.send("User not found");
        }

        const user = results[0];

        if (user.password !== password) {
            return res.send("Incorrect password");
        }

        req.session.userId = user.id;

        res.redirect("/");
    });

});    

//starts server
    app.listen(3000, () =>{
    console.log("Server running on http://localhost:3000");
});

