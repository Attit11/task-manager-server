const express = require("express");
const User = require("../models/user");

const router = new express.Router();

//create user
router.post("/user", async (req, res) => {
  try {
    //creating an instance of the user
    const user = new User(req.body);
    //generating token for the user instance and saving it in the database
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(401).send({ error });
  }
});

//login user
router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send(user);
  } catch (error) {
    res.status(401).send({ error });
  }
});

//logout from one device
router.post("/user/logout", async (req, res) => {
  res.send("🚧 ENDPOINT UNDER CONSTRUCTION");
});

//logout from all device
router.post("/user/logoutAll", async (req, res) => {
  res.send("🚧 ENDPOINT UNDER CONSTRUCTION");
});

//get  user
router.get("/user/me", async (req, res) => {
  res.send("🚧 ENDPOINT UNDER CONSTRUCTION");
});

//delete user
router.delete("/user", async (req, res) => {
  res.send("🚧 ENDPOINT UNDER CONSTRUCTION");
});

//update user
router.patch("/user/:id", async (req, res) => {
  res.send("🚧 ENDPOINT UNDER CONSTRUCTION");
});

module.exports = router;
