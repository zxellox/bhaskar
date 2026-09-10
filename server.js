const express = require("express");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

// Gemini AI
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// Chat route
app.post("/chat", async (req, res) => {

    try {

        const message = req.body.message;

        if (!message) {
            return res.status(400).json({
                reply: "Please type a question."
            });
        }

        const response = await ai.models.generateContent({
            model: "gemini-3.7-flash",
            contents: message
        });

        res.json({
            reply: response.text
        });

    } catch (error) {

        console.log("Gemini Error:", error);

        res.status(500).json({
            reply: "Sorry, I could not get an answer from the AI."
        });
    }
});

// Start server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});