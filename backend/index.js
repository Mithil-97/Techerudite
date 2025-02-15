const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const cors = require("cors");
require("dotenv").config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

const sendVerificationEmail = (email, token) => {
  const link = `http://localhost:3000/verify/${token}`;
  const msg = {
    to: email,
    from: process.env.FROM_EMAIL,
    subject: "Verify Your Email",
    text: `Click the link to verify your email: ${link}`,
    html: `Click the link to verify your email: <a href="${link}">${link}</a>`,
  };

  sgMail
    .send(msg)
    .then(() => console.log("Email sent"))
    .catch((err) => console.error(err));
};

app.post("/register", async (req, res) => {
  const { firstname, lastname, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const token = jwt.sign({ email }, "secret", { expiresIn: "1d" });

  // Check if email already exists
  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    (err, results) => {
      if (err) return res.status(500).send(err);

      if (results.length > 0) {
        return res.status(400).send({
          message:
            "Email already registered! Please log in or verify your email.",
        });
      }

      // Insert user if email is not found
      db.query(
        "INSERT INTO users SET ?",
        {
          firstname,
          lastname,
          email,
          password: hashedPassword,
          role,
          verified: false,
        },
        (insertErr) => {
          if (insertErr) return res.status(500).send(insertErr);
          sendVerificationEmail(email, token);
          res.send({
            message:
              "Registration successful! Please check your email for verification.",
          });
        }
      );
    }
  );
});

app.get("/verify/:token", (req, res) => {
  const { token } = req.params;
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) return res.status(400).send("Invalid token");
    db.query(
      "UPDATE users SET verified = 1 WHERE email = ?",
      [decoded.email],
      (updateErr, result) => {
        if (updateErr) return res.status(500).send("Database update error");
        if (result.affectedRows === 0) {
          return res.status(404).send("User not found");
        }

        res.send("Email verified successfully! You can now log in.");
      }
    );
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0) return res.status(400).send("User not found");

      const user = results[0];
      if (!user.verified)
        return res.status(400).send("Please verify your email first");
      if (!(await bcrypt.compare(password, user.password)))
        return res.status(400).send("Incorrect password");

      if (user.role !== "admin")
        return res.status(403).send("You are not allowed to login from here");

      const token = jwt.sign({ id: user.id, role: user.role }, "secret", {
        expiresIn: "1h",
      });
      res.send({ message: "Login successful", token, role: user.role });
    }
  );
});

app.listen(5000, () => console.log("Server running on port 5000"));
