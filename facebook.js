const express = require("express");
const path = require("path");

const app = express();

// Serve CSS and images
app.use(express.static(path.join(__dirname, "public")));

// Serve facebook.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "facebook.html"));
});



app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});