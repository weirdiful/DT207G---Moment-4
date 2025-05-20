const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Invalid input, send username and password"});
        }

        res.status(201).json({message: "User created"});
    } catch (error) {
        res.status(500).json({ error: "Server error"});
    }
});

router.post("/login", async(req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(400).json({ error: "Invalid input, send username and password"});
        }

        if(username === "name" && password === "password") {
            res.status(200).json({message: "Login successful"});
        } else {
            res.status(401).json({ error: "Invalid username/password"});
        }

       } catch(error) {
        res.status(500).json({ error: "Server error"});
       }
});

module.exports = router;