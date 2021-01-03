const { Schema, model } = require("mongoose");
const joi = require("joi");

//Password regex
// regex(/^[a-zA-Z0-9]{3,30}$/)

const Orders = new Schema({
  FoodId: { type: String },
  Date: { type: String },
  Amount: { type: Number },
});

const UserSchema = new Schema({
  FirstName: { type: String },
  LastName: { type: String },
  PhoneNumber: { type: Number, required: true },
  Password: { type: String, required: true },
  Orders: { type: [Orders] },
  Favorite: { type: [String] },
});

const UserRegisterSchema = joi.object({
  FirstName: joi.string().alphanum().min(3).max(30),
  LastName: joi.string().alphanum().min(3).max(30),
  PhoneNumber: joi.string().alphanum().min(10).max(13).required(),
  Password: joi
    .string()
    .min(8)
    .max(20)
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

const UserLoginSchema = joi.object({
  PhoneNumber: joi.string().alphanum().min(10).max(13).required(),
  Password: joi
    .string()
    .min(8)
    .max(20)
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});
const UserModel = model("Users", UserSchema);

module.exports = { UserModel, UserRegisterSchema, UserLoginSchema };
