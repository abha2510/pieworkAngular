const express = require("express");
const { connection } = require("./db");
require("dotenv").config();
const cors = require("cors");
const Cityrouter = require("./Router/city.router");
const ForecastRouter = require("./Router/forecast.router");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to Weather Dashboard Application!!");
});

app.use("/api/weather",Cityrouter)
app.use("/api/forecast",ForecastRouter)

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Connected to the DataBase!!!");
  } catch (err) {
    console.log("Data connection Failed");
  }
  console.log("Port is Running on port", process.env.port);
});

