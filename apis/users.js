const express = require("express");
const bcrypt = require("bcryptjs");

const Users = express.Router();
Users.use(express.json());

const { UserModel } = require("../db/UserDb");

Users.post("/order/:phone", async (req, res) => {
  const phone = parseInt(req.params.phone);
  const data = {
    FoodId: req.body.FoodId,
    Date: req.body.Date,
    Amount: req.body.Amount,
  };
  await UserModel.findOne({ PhoneNumber: phone })
    .then((result, err) => {
      if (err) return err;
      result.Orders.push(data);
      result.save().then((result, err) => {
        if (err) return err;
        console.log(result);
      });
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
      return err;
    });
});

Users.get("/show", async (req, res) => {
  await UserModel.find({}).then((data) => {
    res.status(200).send(data);
  });
});

Users.get("/show/:phone", async (req, res) => {
  const phone = parseInt(req.params.phone);
  await UserModel.find({ PhoneNumber: phone }).then((data) => {
    res.status(200).send(data);
  });
});

Users.get("/show/orders", async (req, res) => {
  await UserModel.find({}).then((data) => {
    let ordata = new Array();
    data.forEach((element) => {
      element.Orders.forEach((e) => ordata.push(e));
    });
    res.status(200).send(ordata);
  });
});

module.exports = Users;
