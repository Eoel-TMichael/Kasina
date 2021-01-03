const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  UserModel,
  UserRegisterSchema,
  UserLoginSchema,
} = require("../db/UserDb");

const Auth = Router();

Auth.get("/login", async (req, res) => {
  const result = UserLoginSchema.validate(req.body);
  res.send(result);
});

Auth.post("/register", async (req, res) => {
  const result = UserRegisterSchema.validate(req.body);
  console.log(result);
  const hashed = await bcrypt.hash(req.body.Password, 10);
  const data = {
    FirstName: req.body.FirstName ? req.body.FirstName : "",
    LastName: req.body.LastName ? req.body.LastName : "",
    PhoneNumber: req.body.PhoneNumber,
    Password: hashed,
  };
  const doUpload = new UserModel(data);
  await doUpload.save().then((result, err) => {
    if (err) console.log("error happend at: ", err);
    else console.log("done", result);
    res.status(200).json(result);
  });
});

Auth.post("/login", async (req, res, next) => {
  console.log(req.body);
  await UserModel.findOne({ PhoneNumber: req.body.PhoneNumber })
    .then((data) => {
      if (bcrypt.compare(req.body.Password, data.Password) === false) {
        res.status(422).send("try again");
        return false;
      } else {
        const payload = {
          _id: data._id,
          PhoneNumber: data.PhoneNumber,
        };
        jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          { expiresIn: "1d" },
          (err, token) => {
            if (err) res.status(422).send("some error creating the token");
            res.json({ token });
          }
        );
        // res.status(200).send("done");
      }
    })
    .catch((err) => {
      res.status(422).send("can not found the user");
    });
});

module.exports = Auth;
