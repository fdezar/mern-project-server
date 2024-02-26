const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Kanban = require("../models/Kanban.model");

router.post("/create", (req, res, next) => {
    const { title } = req.body;
    
    KanbanItem.create({ title })
    .then(newKanban => {
        return res.json(newKanban);
    })
    .catch(err => {
        console.error("Error creating Kanban:", err);
        res.status(500).json({ message: "Error creating Kanban" });
    })
});

router.put("/:kanbanId", (req, res, next) => {
    const { kanbanId } = req.params;
    const { title } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(kanbanId)) {
        res.status(400).json({ message: "Please provide a valid id" });
        return;
    }
    
    Kanban.findByIdAndUpdate(kanbanId, { title }, { new: true })
    .then(updatedKanban => {
        return res.json(updatedKanban);
    })
    .catch(err => {
        console.error("Error while updating Kanban:", err);
        res.status(500).json({ message: "Error updating Kanban" });
    });
});

router.delete("/:kanbanId", (req, res, next) => {
    const { kanbanId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(kanbanId)) {
        res.status(400).json({ message: "No kanban item found with this id"});
        return;
    }
    
    Kanban.findByIdAndDelete(kanbanId)
    .then(() => {
        res.json({ message: `Kanban item ${kanbanId} deleted successfully.`});
    })
    .catch(err => {
        console.error("Error in Kanban item removal", err);
        res.status(500).json({ message: "Error deleting Kanban item"});
    });
});

module.exports = router;