const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

//create user
router.post("/user", async (req, res) => {
  try {
    console.log(req)
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
    //using self defined model function to find the user authenticate it.
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    //generating a token to login successfully
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(401).send({ error });
  }
});

//logout from one device
router.post("/user/logout", auth, async (req, res) => {
  try {
    //removing the current token form the database
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(401).send(error);
  }
});

//logout from all device
router.post("/user/logoutAll", auth, async (req, res) => {
  try {
    //removes all the token from the database
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(401).send(error);
  }
});

//get  user
router.get("/user/me", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(401).send(error);
  }
});

//delete user
router.delete("/user", auth, async (req, res) => {
  try {
    // await User.findOneAndDelete({ _id: req.user._id });
    // res.send({ user: "User Deleted!" });
    await req.user.remove()
    res.send(req.user)
  } catch (e) {
    res.send(401).send(e);
  }
});

//update user
router.patch("/user/me",auth, async (req, res) => {
//generating user input update field
  const updates = Object.keys(req.body);
  const allowedUpdated = ["name", "age", "email", "password"];
  //checking whether the update field is valid or not
  const isValid = updates.every((update) => allowedUpdated.includes(update));
  if (!isValid) {
    res.status(401).send({ error: "Invalid Updates!" });
  }
  try {
    //updating with the replaced user input
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user)
  } catch (error) {
    res.status(401).send(error);
  }
});

module.exports = router;
