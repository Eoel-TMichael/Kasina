const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const ErrorHandler = require("./middlewares/ErrorHandler");

const Restaurant = require("./apis/restaurants");
const Users = require("./apis/users");
const Auth = require("./auth/index");
const middlewares = require("./auth/middlewares");

const app = express();

app.use(middlewares.checkTokenSetUser);

require("dotenv").config();
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());
require("dotenv").config();

//Connecting to the database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🐓️️ connected ️💮️"))
  .catch((err) => {
    console.log("error happend : ", err);
    res.status(500).send("error when connecting to the database");
  });

app.get("/", (req, res) => {
  res.status(200).send("works");
});

//Routes and error handling
app.use("/restaurant", Restaurant);
app.use("/user", Users);
app.use("/auth", Auth);
app.use(ErrorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`server started http://localhost:${PORT}`));
