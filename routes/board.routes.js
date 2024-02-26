const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Board = require("../models/Board.model");

router.get("/", (req, res, next) => {
    Board.find()
        .populate("kanban") // ToDo - revisar 
        .then(allBoards => {
            return res.json(allBoards);
        })
        .catch(err => {
            console.log("Error getting Boards:", err);
            res.status(500).json({ message: "Error getting Boards" });
        });
});

router.post("/create", (req, res, next) => {
    const { title } = req.body;
    
    Board.create({ title })
    .then(newBoard => {
        return res.json(newBoard);
    })
    .catch(err => {
        console.error("Error creating Board:", err);
        res.status(500).json({ message: "Error creating Board" });
    })
});

router.put("/:boardId", (req, res, next) => {
    const { boardId } = req.params;
    const { title } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(boardId)) {
        res.status(400).json({ message: "Please provide a valid id" });
        return;
    }
    
    Board.findByIdAndUpdate(boardId, { title }, { new: true })
    .then(updatedBoard => {
        return res.json(updatedBoard);
    })
    .catch(err => {
        console.error("Error while updating Board:", err);
        res.status(500).json({ message: "Error updating Board" });
    });
});

router.delete("/:kanbanId", (req, res, next) => {
    const { boardId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(boardId)) {
        res.status(400).json({ message: "No board item found with this id"});
        return;
    }
    
    Board.findByIdAndDelete(boardId)
    .then(() => {
        res.json({ message: `Board with id ${kanbanId} deleted successfully.`});
    })
    .catch(err => {
        console.error("Error in Board removal", err);
        res.status(500).json({ message: "Error deleting Board"});
    });
});

module.exports = router;