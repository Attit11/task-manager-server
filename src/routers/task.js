const express = require("express");
const router = new express.Router();

//create task
router.post("/task", async (req, res) => {
  res.send("🚧 ENDPOINT UNDER CONSTRUCTION");
});

//get all task
router.get("/task", async (req, res) => {
  res.send("🚧 ENDPOINT UNDER CONSTRUCTION");
});

//get one task
router.get("/task/:id", async (req, res) => {
  res.send("🚧 ENDPOINT UNDER CONSTRUCTION");
});

//delete task
router.delete("/task/:id", async (req, res) => {
  res.send("🚧 ENDPOINT UNDER CONSTRUCTION");
});

//update task
router.patch("/task/:id", async (req, res) => {
  res.send("🚧 ENDPOINT UNDER CONSTRUCTION");
});

module.exports = router
