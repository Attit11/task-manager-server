const express = require("express");
const auth = require("../middleware/auth");
const Task = require("../models/task");
const router = new express.Router();

//create task
router.post("/task", auth, async (req, res) => {
  try {
    const task = new Task({ ...req.body, owner: req.user._id });
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    console.log(`❌ Error Encountered ${error}`);
    
    res.status(500).send({ error });
  }
});

//get all task
router.get("/task", auth, async (req, res) => {
  try {
    //fetching tasks with the user ID
    const tasks = await Task.find({ owner: req.user._id });
    if (!tasks) {
      return res.status(404).send();
    }
    res.send(tasks);
  } catch (error) {
    console.log(`❌ Error Encountered ${error}`);

    res.status(500).send({ error });
  }
});

//get one task
router.get("/task/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send({ error: "Could not find your task!" });
    }
    res.send(task);
  } catch (error) {
    res.send(500).send({ error });
  }
});

//delete task
router.delete("/task/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if(!task){
      return res.status(400).send({error: "Task not found!"})
    }
    res.send({ message: "User Deleted!" });
  } catch (error) {
    console.log({error})
    res.status(500).send({ error });
  }
});

//update task
router.patch("/task/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completeds"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (isValidOperation) {
    return res.status(401).send({ error: "Invalid Updated!" });
  }
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) {
      return res.send(404).send({ error: "Not found" });
    }
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (error) {
    console.log(`❌ Error Encountered ${error}`);
    res.status(500).send({ error });
  }
});

module.exports = router;
