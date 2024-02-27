const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Kanban = require("../models/Kanban.model");

router.post("/create", (req, res, next) => {
  const { title } = req.body;
  const { _id } = req.payload;

  const kanban = {
    title: title,
  };
  kanban.user = _id;

  Kanban.create({ title })
    .then((newKanban) => {
      return res.json(newKanban);
    })
    .catch((err) => {
      console.error("Error creating Kanban:", err);
      res.status(500).json({ message: "Error creating Kanban" });
    });
});

router.get("/:kanbanId", (req, res, next) => {
  const { kanbanId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(gameId)) {
    res.status(400).json({ message: "Specified kanban id is not valid" });
    return;
  }

  Kanban.findById(kanbanId)
    .populate("kanbanItems")
    .then((kanbanFound) => {
      return res.status(200).json(kanbanFound);
    })
    .catch((err) => {
      console.log("Error while retrieving kanban", err);
      res.status(500).json({ message: "Error while retrieving kanban" });
    });
});

router.put("/:kanbanId", (req, res, next) => {
  const { kanbanId } = req.params;
  const { title } = req.body;

  if (!mongoose.Types.ObjectId.isValid(kanbanId)) {
    res.status(400).json({ message: "Please provide a valid id" });
    return;
  }

  Kanban.findByIdAndUpdate(kanbanId, { title }, { new: true })
    .then((updatedKanban) => {
      return res.json(updatedKanban);
    })
    .catch((err) => {
      console.error("Error while updating Kanban:", err);
      res.status(500).json({ message: "Error updating Kanban" });
    });
});

router.delete("/:kanbanId", (req, res, next) => {
  const { kanbanId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(kanbanId)) {
    res.status(400).json({ message: "No kanban item found with this id" });
    return;
  }

  Kanban.findByIdAndDelete(kanbanId)
    .then(() => {
      res.json({ message: `Kanban item ${kanbanId} deleted successfully.` });
    })
    .catch((err) => {
      console.error("Error in Kanban item removal", err);
      res.status(500).json({ message: "Error deleting Kanban item" });
    });
});

module.exports = router;
