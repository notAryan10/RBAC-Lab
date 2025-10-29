const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

// Secret key for JWT signing
const JWT_SECRET = "newtonschoolsecret";

// In-memory user data
const users = [
  { username: "yash", password: "123", role: "admin" },
  { username: "ankit", password: "123", role: "teacher" },
  { username: "anurag", password: "123", role: "student" },
];

// --- LOGIN ROUTE ---
app.post("/login", (req, res) => {
  
});

// --- AUTH MIDDLEWARE ---
const authenticate = (req, res, next) => {
  
};

// --- ROLE CHECK MIDDLEWARE ---
const authorize = (allowedRoles) => (req, res, next) => {
  
};

// --- PROTECTED ROUTES ---
app.get("/admin", authenticate, authorize(["admin"]), (req, res) => {
  res.send("Welcome, admin!");
});

app.get("/teacher", authenticate, authorize(["teacher"]), (req, res) => {
  res.send("Welcome, teacher!");
});

app.get("/student", authenticate, authorize(["student"]), (req, res) => {
  res.send("Welcome, student!");
});

module.exports = app;

// --- RUN DIRECTLY IF NOT TESTING ---
const PORT = 3300;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
