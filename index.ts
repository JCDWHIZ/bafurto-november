import express from "express";
import { connectToDb } from "./config/db";
import { configDotenv } from "dotenv";
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const app = express();
dotenv.config();

connectToDb();
app.use(express.json());

app.use((req, res, next) => {
  console.log(
    `${new Date().toISOString()} - ${req.method}  - ${
      req.url
    } - ${JSON.stringify(req.body)} - ${res.statusCode}`,
  );
  next();
});

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("<h1>hello world, welcome to the home page</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>hello world, welcome to the about page</h1>");
});
app.get("/contact", (req, res) => {
  res.send("<h1>hello world, welcome to the contact us page</h1>");
});

app.post("/dummy", (req, res) => {
  // const text = req.body  -- which means the payload being sent
  const { name, id } = req.body;
  // console.log(name)
  // req.params -- used for dynamic routing
  // const id = req.params.id;
  // const name = req.params.name;
  // const { id } = req.params;
  // req.query -- used for certain filters
  // const { name, category, something } = req.query;
  // res.send(
  //   `<h1>hello world ${name}, welcome to the contact us page with ${category} and ${something}</h1>`
  // );

  // RES
  // res.status() -- takes in a parameter of number e.g 200, 201, 404
  // res
  //   .status(404)
  //   .send(
  //     `<h1>hello world ${name}, welcome to the contact us page with ${category} and ${something}</h1>`
  //   );
  // res.send() -- to send output to the client
  // res.json() -- to send json or object output
  // res.json({
  //   message: " welcome to dummy page  ",
  // });
  res.send({
    id,
    name,
  });
});

app.listen(5173, () => {
  console.log("Server running at 5173");
});

// create an endpoint that uses id as the params also return a json with the id passed with staus code 200 using send
// create an enpoint that uses the name query paramter and return the name with just json
