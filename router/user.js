const express = require("express");
const mysql = require("mysql");
const connect = require("../config/index");
const db = mysql.createConnection(connect);

const router = express.Router();

//read all users
router.get("/", (req, res, next) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result, filed) => {
    if (err) return res.json({ message: err, status: err?.status });

    return res.json(result).status(200);
  });
});

//Insert User
router.post("/", (req, res) => {
  try {
    const { name, email } = req.body;
    const sql = "INSERT INTO users (name,email) VALUES(?,?)";
    if (!name || !email)
      return res.json({
        message: "Please Enter name or email for insert user!!",
        status: 422,
      });
    db.query(sql, [name, email], (err, result, filed) => {
      if (err) console.error(err);
      res
        .json({
          message: `Insert User | Name : ${name} | Email : ${email} Successfully.`,
        })
        .status(201);
    });
  } catch (err) {
    console.log(err);
  }
});

//Update user data
router.put("/", (req, res, next) => {
  const { name, email, id } = req.body;
  const sql = "UPDATE users SET name = ?, email = ? WHERE ID = ?";
  db.query(sql, [name, email, id], (err, result, filed) => {
    if (err) console.log(err);

    res.json({ message: "updated", data: result }).status(204);
  });
});

//Get user with id
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;

    const sql = "SELECT * FROM users WHERE ID = ?";

    db.query(sql, [id], (err, result, filed) => {
      if (err) console.log(err);

      res.json(result).status(200);
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
