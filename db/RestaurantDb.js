const { Schema, model } = require("mongoose");

const FoodSchema = new Schema({
  FoodName: { type: String },
  FoodPrice: { type: Number },
  FoodIngridents: { type: String },
  FoodPhoto: { type: String },
});

const RestaurantSchema = new Schema({
  RestaurantName: { type: String, required: true },
  RestaurantPhone: { type: Number, required: true },
  RestaurantAddress: { type: String, required: true },
  RestauantPassword: { type: String },
  RestaurantPhoto: { type: String },
  RestaurantFoods: { type: [FoodSchema] },
});

module.exports = model("restaurants", RestaurantSchema);
