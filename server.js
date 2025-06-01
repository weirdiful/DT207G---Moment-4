const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(process.env.DATABASE);

const cors = require("cors");
app.use(cors());


//Routes

app.use("/api", authRoutes)

app.get("/api/users", authenticateToken, (req, res) => {
    db.all("SELECT id, username, created FROM users", (err, rows) => {
        if (err) return res.status(500).json({message: "Database error"});

        res.status(200).json(rows);
    });
});

//Protected Routes
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({message: "Skyddar route"});
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({message: "Not authorized"});

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) return res.status(403).json({message: "Not correct JWT"});

        req.user = user;
        next();
    });
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})