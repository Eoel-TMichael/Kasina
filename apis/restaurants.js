const express = require("express");

const Restaurants = express.Router();
Restaurants.use(express.json());

const RestaurantModel = require("../db/RestaurantDb");

//Post Requests
Restaurants.post("/register", (req, res) => {
  let photo;
  console.log(req.body);
  req.body.restaurantPhoto !== null
    ? (photo = req.body.restaurantPhoto)
    : (photo = "");
  const data = {
    RestaurantName: req.body.restaurantName.toString(),
    RestaurantPhone: req.body.restaurantPhone,
    RestaurantAddress: req.body.restaurantAddress.toString(),
    RestaurantPhoto: photo.toString(),
  };
  const doUpload = new RestaurantModel(data);
  doUpload.save().then((result, err) => {
    if (err) console.log("error happend at: ", err);
    else console.log("done", result);
    res.status(200).json(result);
  });
});

Restaurants.post("/addfood/:id", async (req, res) => {
  // res.status(200).send("🥘, 🥕, 🍔, 🍌, 🍎, 🍻");
  const rsfd = {
    FoodName: req.body.FoodName,
    FoodPrice: parseInt(req.body.FoodPrice),
    FoodIngridents: req.body.FoodIngredient,
    FoodPhoto: req.body.FoodPhoto,
  };
  const id = req.params.id;
  await RestaurantModel.findOne({ _id: id })
    .then((result, err) => {
      if (err) console.log("error happened: ", err);
      console.log(result.RestaurantFoods);
      result.RestaurantFoods.push(rsfd);
      result
        .save()
        .then((res) => console.log("res res", res))
        .catch((err) => console.log(err));
      console.log("succ ", result);
    })
    .catch((err) => console.log("errrrr ", err));
});

// GET requests
Restaurants.get("/foods/:id", async (req, res) => {
  const idi = req.params.id;
  await RestaurantModel.findOne({ _id: idi })
    .then((result) => {
      res.status(200).json(result.RestaurantFoods);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("🥘, 🥕, 🍔, 🍌, 🍎, 🍻");
    });
});

Restaurants.get("/", (req, res) => {
  res.status(200).send("restaurant 🥘, 🥕, 🍔, 🍌, 🍎, 🍻");
});

Restaurants.get("/show", async (req, res) => {
  const data = await RestaurantModel.find({})
    .then((result, err) => {
      if (err) console.log(err);
      return result;
    })
    .catch((err) => {
      console.log("error at: ", err);
      res.status(500).send("can not start searching");
    });
  res.status(200).send(data);
});

Restaurants.get("/show/:phone", async (req, res) => {
  const phone = parseInt(req.params.phone);

  const data = await RestaurantModel.findOne({ RestaurantPhone: phone })
    .then((result, err) => {
      if (err) {
        console.log(err);
        res.status(500).send("can not find the Restaurant");
      }
      return result;
    })
    .catch((err) => {
      console.log("error at: ", err);
      res.status(500).send("can not start searching");
    });
  res.status(200).send(data);
});

module.exports = Restaurants;
