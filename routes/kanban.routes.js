const express = require("express");
const router = express.Router();

const Kanban = require("../models/KanbanItem.model");
const KanbanItem = require("../models/KanbanItem.model");

router.get("/", (req, res, next) => {
    Kanban.find()
        .then(allKanbanItems => {
            return res.json(allKanbanItems);
        })
        .catch(err => {
            console.log("Error getting Kanban Items:", err);
            res.status(500).json({ message: "Error getting Kanban items" });
        });
});

router.post("/create", (req, res, next) => {
    const { title, description, status } = req.body;
    
    KanbanItem.create({ title, description, status })
    .then(newKanbanItem => {
        return res.json(newKanbanItem);
    })
    .catch(err => {
        console.error("Error creating Kanban Item:", err);
        res.status(500).json({ message: "Error creating Kanban Item" });
    })
});

router.put("/:kanbanItemId", (req, res, next) => {
    const { kanbanItemId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(kanbanItemId)) {
        res.status(400).json({ message: "Please provide a valid id" });
        return;
    }
    
    KanbanItem.findByIdAndUpdate(kanbanItemId, req.body, { new: true })
    .then(updatedKanbanItem => {
        return res.json(updatedKanbanItem);
    })
    .catch(err => {
        console.error("Error while updating Kanban Item:", err);
        res.status(500).json({ message: "Error updating Kanban Item" });
    });
});

router.delete("/:kanbanItemId", (req, res, next) => {
    const { kanbanItemId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(kanbanItemId)) {
        res.status(400).json({ message: "No kanban item found with this id"});
        return;
    }
    
    KanbanItem.findByIdAndDelete(kanbanItemId)
    .then(() => {
        res.json({ message: `Kanban item ${kanbanItemId} deleted successfully.`});
    })
    .catch(err => {
        console.error("Error in Kanban removal", err);
        res.status(500).json({ message: "Error deleting Kanban item"});
    });
});

module.exports = router;

// router.post("/:kanbanItemId", (req, res, next) => {
//     const { kanbanItemId } = req.params;
    
// });

// router.get("/:id/edit", (req, res, next) => {
    
    // });
    
    // router.get("/create", (req, res, next) => {
        
// });

// router.get("/:id", (req, res, next) => {
            
// });