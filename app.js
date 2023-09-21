const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

const userRouter = require("./router/user");

app.get("/", (req, res) => {
  res
    .json({
      message: "Hello, world",
      status: 200,
    })
    .status(200);
});

app.use("/user", userRouter);

app.get("*", (req, res) => {
  return res.send("404 Page not founded").status(404);
});

app.listen(8081, () => {
  console.log(`Server running on Port : ${8081}.`);
});
