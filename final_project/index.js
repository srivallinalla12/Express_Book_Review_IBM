const express = require("express");
const session = require("express-session");
const jwt = require("jsonwebtoken");

const customer_routes = require("./router/auth_users.js");
const general_routes = require("./router/general.js");

const app = express();

app.use(express.json());

// ================= SESSION MIDDLEWARE =================
app.use(session({
  secret: "fingerprint_customer",
  resave: true,
  saveUninitialized: true
}));

// ================= LOGIN ROUTE =================
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "user1" && password === "pass123") {
    let accessToken = jwt.sign({ username: username }, "access", { expiresIn: "1h" });
    req.session.authorization = { accessToken };
    return res.status(200).json({ message: "Login successful", token: accessToken });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

// ================= AUTH MIDDLEWARE =================
app.use("/customer/auth/*", function auth(req, res, next) {
  if (req.session.authorization) {
    let token = req.session.authorization['accessToken'];
    jwt.verify(token, "access", (err, user) => {
      if (!err) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } else {
    return res.status(403).json({ message: "User not logged in" });
  }
});

// ================= PROTECTED ROUTE =================
app.get("/customer/auth/profile", (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}! This is your profile.` });
});

// ================= ROUTE MOUNTING =================
app.use("/", general_routes);       // Public routes (Tasks 1–5)
app.use("/customer", customer_routes); // Registered user routes (Tasks 6–9)

// ================= LOGOUT ROUTE =================
app.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out successfully" });
});

// ================= START SERVER =================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
