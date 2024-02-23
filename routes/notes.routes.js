const express = require("express");
const router = express.Router();

const fileUploader = require("../config/cloudinary.config");

const Note = require("../models/Note.model");

router.get("/", (req, res, next) => {

});

// router.get("/create", (req, res, next) => {

// });

router.post("/create", fileUploader.single("headerImage"), (req, res, next) => {
    const { users, title, content, headerImage } = req.body;

    Note.create({ users, title, content, headerImage })
        .then(newNote => {
            return res.json(newNote);
        })
        .catch(err => {
            console.error("Error creating note:", err);
            res.status(500).json({ message: "Error creating note" });
        })
});

router.get("/:noteId", (req, res, next) => {
    const { noteId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        res.status(400).json({ message: "Specified note id is not valid" });
        return;
    }

    Note.findById(noteId)
        .then(note => {
            return res.status(200).json(note);
        })
        .catch(err => {
            console.error("Error while retrieving note:", err);
            res.status(500).json({ message: "Error while retrieving note" });
        });
});

router.post("/:noteId", (req, res, next) => {
    const { noteId } = req.params;
});

// router.get("/:id/edit", (req, res, next) => {

// });

router.put("/:noteId", (req, res, next) => {
    const { noteId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        res.status(400).json({ message: "Specified note id is not valid" });
        return;
    }

    Note.findByIdAndUpdate(noteId, req.body, { new: true })
        .then(updatedNote => {
            return res.json(updatedNote);
        })
        .catch(err => {
            console.error("Error while updating the note:", err);
        })
});

router.delete("/:noteId", (req, res, next) => {
    const { noteId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }

    Note.findByIdAndDelete(noteId)
        .then(() => {
            return res.json({ message: "Note removed successfully"});
        })
        .catch(err => {
            console.error("Error while deleting specified note:", err);
            res.status(500).json({ message: "Error while deleting specified note" });
        })
});

module.exports = router;