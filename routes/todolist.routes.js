const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const ToDoListItem = require("../models/ToDoListItem.model");

router.get("/", (req, res, next) => {
    ToDoListItem.find()
        // ToDo - asignar notas al usuario
        .then(allToDoListItems => {
            return res.json(allToDoListItems);
        })
        .catch(err => {
            console.error("Error retrieving all toDoListItems:", err);
            res.status(500).json({ message: "Error retrieving all toDoListItems" });
        })
});

router.post("/create", (req, res, next) => {
    const { content } = req.body;
    
    ToDoListItem.create({ content })
    .then(newToDoListItem => {
        return res.json(newToDoListItem);
    })
    .catch(err => {
        console.error("Error creating toDoListItem:", err);
        res.status(500).json({ message: "Error creating toDoListItem" });
    })
});

router.get("/:toDoListItemId", (req, res, next) => {
    const { toDoListItemId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(toDoListItemId)) {
        res.status(400).json({ message: "Specified toDoListItem id is not valid" });
        return;
    }
    
    ToDoListItem.findById(toDoListItemId)
    .then(toDoListItem => {
        return res.status(200).json(toDoListItem);
    })
    .catch(err => {
        console.error("Error while retrieving toDoListItem:", err);
        res.status(500).json({ message: "Error while retrieving toDoListItem" });
    });
});

router.put("/:toDoListItemId", (req, res, next) => {
    const { toDoListItemId } = req.params;
    const { content } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(toDoListItemId)) {
        res.status(400).json({ message: "Specified ToDoListItem id is not valid" });
        return;
    }
    
    ToDoListItem.findByIdAndUpdate(toDoListItemId, { content }, { new: true })
    .then(updatedToDoListItem => {
        return res.json(updatedToDoListItem);
    })
    .catch(err => {
        console.error("Error while updating the toDoListItem:", err);
    })
});

router.delete("/:toDoListItemId", (req, res, next) => {
    const { toDoListItemId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(toDoListItemId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
    }
    
    ToDoListItem.findByIdAndDelete(toDoListItemId)
    .then(() => {
        return res.json({ message: "ToDoListItem removed successfully"});
    })
    .catch(err => {
        console.error("Error while deleting specified toDoListItem:", err);
        res.status(500).json({ message: "Error while deleting specified toDoListItem" });
    })
});

module.exports = router;