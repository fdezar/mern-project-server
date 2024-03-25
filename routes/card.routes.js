const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Kanban = require("../models/Kanban.model");
const Card = require("../models/Card.model");

router.post("/:kanbanId/createCard", (req, res, next) => {
  const { kanbanId } = req.params;
  const { text } = req.body;
  const card = {
    text: text,
    kanbanParent: kanbanId
  };

  Card.create(card)
    .then((newCard) => {
      return Kanban.findByIdAndUpdate(kanbanId, {
        $push: { cards: newCard._id },
      });
    })
    .then((response) => {
      return res.json(response);
    })
    .catch((err) => {
      // console.error("Error creating Kanban Item:", err);
      res.status(500).json({ message: "Error creating Kanban Card" });
    });
});

router.put("/:kanbanId/:cardId", (req, res, next) => {
  const { kanbanId, cardId } = req.params;
  const { text, kanbanParent } = req.body;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    res.status(400).json({ message: "Please provide a valid id" });
    return;
  }

  Card.findByIdAndUpdate(
    cardId,
    { text, kanbanParent },
    { new: true }
  )
    .then((updatedCard) => {
      return res.json(updatedCard);
    })
    .catch((err) => {
      // console.error("Error while updating Kanban Item:", err);
      res.status(500).json({ message: "Error updating Kanban Card" });
    });
});

router.delete("/:kanbanId/:cardId", (req, res, next) => {
  const { kanbanId, cardId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    res.status(400).json({ message: "No kanban card found with this id" });
    return;
  }

  Card.findByIdAndDelete(cardId)
    .then(() => {
        return Kanban.findByIdAndUpdate(
            kanbanId,
            { $pull: { cards: cardId } },
            { new: true }
        );
    })
    .then(() => {
      return res.json({
        message: `Kanban card ${cardId} deleted successfully.`,
      });
    })
    .catch((err) => {
      // console.error("Error in Kanban item removal", err);
      res.status(500).json({ message: "Error deleting Kanban card" });
    });
});

module.exports = router;
