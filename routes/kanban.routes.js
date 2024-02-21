const express = require("express");
const router = express.Router();

const KanbanItem = require("../models/KanbanItem.model")

router.get("/", (req, res, next) => {

});

// router.get("/create", (req, res, next) => {

// });

router.post("/create", (req, res, next) => {

});

// router.get("/:id", (req, res, next) => {

// });

router.post("/:id", (req, res, next) => {

});

// router.get("/:id/edit", (req, res, next) => {

// });

router.put("/:id/edit", (req, res, next) => {

});

router.delete("/:id/delete", (req, res, next) => {

});

module.exports = router;