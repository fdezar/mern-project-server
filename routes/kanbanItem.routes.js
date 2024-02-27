const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Kanban = require("../models/Kanban.model");
const KanbanItem = require("../models/KanbanItem.model");

router.post("/:kanbanId/create", (req, res, next) => {
  const { kanbanId } = req.params;
  const { title, description } = req.body;
  const { _id } = req.payload;
  const kanbanItem = {
    title: title,
    description: description,
    kanbanParent: kanbanId,
  };
  kanbanItem.user = _id;

  KanbanItem.create({ title, description, kanbanParent, authorId })
    .then((newKanbanItem) => {
      return Kanban.findByIdAndUpdate(kanbanId, {
        $push: { kanbanItems: newKanbanItem._id },
      });
    })
    .then((response) => {
      return res.json(response);
    })
    .catch((err) => {
      console.error("Error creating Kanban Item:", err);
      res.status(500).json({ message: "Error creating Kanban Item" });
    });
});

router.put("/:kanbanId/:kanbanItemId", (req, res, next) => {
  const { kanbanId, kanbanItemId } = req.params;
  const { title, description, status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(kanbanItemId)) {
    res.status(400).json({ message: "Please provide a valid id" });
    return;
  }

  KanbanItem.findByIdAndUpdate(
    kanbanItemId,
    { title, description, status },
    { new: true }
  )
    .then((updatedKanbanItem) => {
      return res.json(updatedKanbanItem);
    })
    .catch((err) => {
      console.error("Error while updating Kanban Item:", err);
      res.status(500).json({ message: "Error updating Kanban Item" });
    });
});

router.delete("/:kanbanId/:kanbanItemId", (req, res, next) => {
  const { kanbanId, kanbanItemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(kanbanItemId)) {
    res.status(400).json({ message: "No kanban item found with this id" });
    return;
  }

  KanbanItem.findByIdAndDelete(kanbanItemId)
    .then(() => {
      res.json({
        message: `Kanban item ${kanbanItemId} deleted successfully.`,
      });
    })
    .catch((err) => {
      console.error("Error in Kanban item removal", err);
      res.status(500).json({ message: "Error deleting Kanban item" });
    });
});

module.exports = router;
