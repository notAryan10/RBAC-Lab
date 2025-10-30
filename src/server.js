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
  const { username, password } = req.body

  const user = users.find((u) => u.username === username && u.password === password)

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  const payload = { username: user.username, role: user.role }
  const token = jwt.sign(payload, JWT_SECRET)

  return res.json({ token })
});

// --- AUTH MIDDLEWARE ---
const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"]

  if (!authHeader) {
    return res.status(401).json({ message: "Missing token" })
  }

  const parts = authHeader.split(" ")
  if (parts[0] !== "Bearer") {
    return res.status(403).json({ message: "Invalid token" })
  }

  const token = parts[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" })
  }
};

// --- ROLE CHECK MIDDLEWARE ---
const authorize = (allowedRoles) => (req, res, next) => {
  const user = req.user
  if (!user || !user.role || !allowedRoles.includes(user.role)) {
    return res.status(403).json({ message: "Access denied" })
  }
  next()
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
if (require.main === module) {
  const PORT = 3300;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
