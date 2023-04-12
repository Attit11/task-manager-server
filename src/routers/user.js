const express = require("express");

const router = new express.Router();

//create user
router.post("/user", async (req, res) => {
  res.send("🚧 ENDPOINT UNDER CONSTRUCTION");
});

//login user
router.post("/user/login", async (req, res) => {
  res.send("🚧 ENDPOINT UNDER CONSTRUCTION");
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
