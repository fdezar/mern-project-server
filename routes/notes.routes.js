const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Note = require("../models/Note.model");
const User = require("../models/User.model");

router.get("/", (req, res, next) => {
  const { _id } = req.payload;

  Note.find({ user: _id })
    .then((userNotes) => {
      return res.json(userNotes);
    })
    .catch((err) => {
      // console.error("Error retrieving all notes:", err);
      res.status(500).json({ message: "Error retrieving all notes" });
    });
});

router.post("/create", (req, res, next) => {
  const { title, content } = req.body;
  const { _id } = req.payload;

  const note = {
    title: title,
    content: content,
  };
  note.user = _id;

  Note.create(note)
    .then(newNote => {
      return User.findByIdAndUpdate(
        _id,
        { $push: { userNotes: newNote._id }}
      );
    })
    .then((newNote) => {
      return res.json(newNote);
    })
    .catch((err) => {
      // console.error("Error creating note:", err);
      res.status(500).json({ message: "Error creating note" });
    });
});

router.get("/:noteId", (req, res, next) => {
  const { noteId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    res.status(400).json({ message: "Specified note id is not valid" });
    return;
  }

  Note.findById(noteId)
    .then((note) => {
      return res.status(200).json(note);
    })
    .catch((err) => {
      // console.error("Error while retrieving note:", err);
      res.status(500).json({ message: "Error while retrieving note" });
    });
});

router.put("/:noteId", (req, res, next) => {
  const { noteId } = req.params;
  const { title, content } = req.body;

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    res.status(400).json({ message: "Specified note id is not valid" });
    return;
  }

  Note.findByIdAndUpdate(noteId, { title, content }, { new: true })
    .then((updatedNote) => {
      return res.json(updatedNote);
    })
    .catch((err) => {
      // console.error("Error while updating the note:", err);
    });
});

router.delete("/:noteId", (req, res, next) => {
  const { noteId } = req.params;
  const { _id } = req.payload;

  if (!mongoose.Types.ObjectId.isValid(noteId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Note.findByIdAndDelete(noteId)
    .then(() => {
      return User.findByIdAndUpdate(
        _id,
        { $pull: { userNotes: noteId }},
        { new: true }
      );
    })
    .then(() => {
      return res.json({ message: "Note removed successfully" });
    })
    .catch((err) => {
      // console.error("Error while deleting specified note:", err);
      res.status(500).json({ message: "Error while deleting specified note" });
    });
});

module.exports = router;
