const express = require("express");
const router = new express.Router();
const Task = require("../models/task");

router.post("/tasks", (req, res) => {
  console.log("here");
  const task = new Task(req.body);
  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.get("/tasks", (req, res) => {
  Task.find({})
    .then((tasks) => {
      res.status(200).send(tasks);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  Task.findById(_id)
    .then((task) => {
      if (!task) {
        return res.status(404).send();
      }
      res.send(task);
    })
    .catch((e) => {
      res.status(500).send(e);
    });
});

router.patch("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  try {
    const task = Task.findById(_id);
    updates.forEach((update) => (task[update] = req.body[update]));
    await Task.save();
    if (!task) res.status(404).send();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Tast.findByIdAndDelete(_id);

    if (!task) return res.status(404).send();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
