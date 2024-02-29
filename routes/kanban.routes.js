const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Kanban = require("../models/Kanban.model");
const User = require("../models/User.model");

router.get("/", (req, res, next) => {
  const { _id } = req.payload;

  Kanban.find({ user: _id })
    .populate("kanbanItems")
    .then((userKanbans) => {
      return res.status(200).json(userKanbans);
    })
    .catch((err) => {
      console.log("Error while retrieving kanban", err);
      res.status(500).json({ message: "Error while retrieving kanban" });
    });
});

router.post("/create", async (req, res, next) => {
  const { title } = req.body;
  const { _id } = req.payload;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ToDo - esto no funciona. Cómo prevengo de que lo añada?
    if (user.userKanban && user.userKanban.length >= 5) {
      return res
        .status(400)
        .json({ message: "Maximum number of Kanbans reached" });
    }

    const kanban = {
      title: title,
      user: _id,
    };
    const newKanban = await Kanban.create(kanban);

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { $push: { userKanban: newKanban._id } },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    console.error("Error creating Kanban:", err);
    res.status(500).json({ message: "Error creating Kanban" });
  }
});

// router.post("/create", (req, res, next) => {
//   const { title } = req.body;
//   const { _id } = req.payload;

//     User.findById(_id)
//       .then(user => {
//         if (!user) {
//           return res.status(404).json({ message: "User not found" });
//         }

//         if (user.userKanban.length >= 5) {
//           return res.status(400).json({ message: "Maximum number of Kanbans reached" });
//         }

//         const kanban = {
//           title: title,
//         };
//         kanban.user = _id;

//         return Kanban.create(kanban);
//       })
//       .then(newKanban => {
//       return User.findByIdAndUpdate(
//         _id,
//         { $push: { userKanban: newKanban._id }},
//         { new: true }
//         );
//       })
//       .then(updatedUser => {
//         return res.json(updatedUser);
//       })
//       .catch((err) => {
//         console.error("Error creating Kanban:", err);
//         res.status(500).json({ message: "Error creating Kanban" });
//       });
//     });

router.get("/:kanbanId", (req, res, next) => {
  const { kanbanId } = req.params;

  // ToDo - hacer que hagas retrieve de los kanban en función del usuario

  if (!mongoose.Types.ObjectId.isValid(kanbanId)) {
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
  const { _id } = req.payload;

  if (!mongoose.Types.ObjectId.isValid(kanbanId)) {
    res.status(400).json({ message: "No kanban item found with this id" });
    return;
  }

  Kanban.findByIdAndDelete(kanbanId)
    .then(() => {
      return User.findByIdAndUpdate(
        _id,
        { $pull: { userKanban: kanbanId } },
        { new: true }
      );
    })
    .then(() => {
      return res.json({
        message: `Kanban item ${kanbanId} deleted successfully.`,
      });
    })
    .catch((err) => {
      console.error("Error in Kanban item removal", err);
      res.status(500).json({ message: "Error deleting Kanban item" });
    });
});

module.exports = router;

//   if (User.Kanban.length) {
//      // ToDo - cómo poner el límite. Dónde lo voy a definir? Lo voy a diefinir en variable global como app use...?
//   }
