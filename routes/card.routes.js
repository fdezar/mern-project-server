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

// router.patch("/:kanbanId/:cardId/move", (req, res, next) => {
//   const { fromId, toId, toIndex } = req.body;
//   const { kanbanId, cardId } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(cardId)) {
//     res.status(400).json({ message: "Please provide a valid id" });
//     return;
//   }

//   Kanban.findById(fromId)
//     .then(from => {
//       if (!from) {
//         throw new Error("From list not found");
//       }
//       return Kanban.findById(toId);
//     })
//     .then(to => {
//       if (!to) {
//         throw new Error("To list not found");
//       }

//       if (fromId === toId) {
//         to = from;
//       }

//       return { from, to };
//     })
//     .then(({ from, to }) => {
//       const fromIndex = from.cards.indexOf(cardId);
//       if (fromIndex !== -1) {
//         from.cards.splice(fromIndex, 1);
//         return from.save();
//       } else {
//         return Promise.resolve();
//       }
//     })
//     .then(() => {
//       return List.findById(toId);
//     })
//     .then(to => {
//       if (!to.cards.includes(cardId)) {
//         if (toIndex === 0 || toIndex) {
//           to.cards.splice(toIndex, 0, cardId);
//         } else {
//           to.cards.push(cardId);
//         }
//         return to.save();
//       } else {
//         return Promise.resolve();
//       }
//     })
//     .then(() => {
//       res.status(200).send({ cardId, from, to });
//     })
//     .catch(err => {
//       console.error(err);
//       res.status(500).send("Server Error");
//     });
// });

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
