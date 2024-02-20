const { Schema, model } = require("mongoose");

const kanbanSchema = new Schema(
    {
       toDo: {

       },
       inProgress: {

       },
       Done: {

       }, 
    },
    {
        timestamps: true,
    }
)

const Kanban = model("Kanban", kanbanSchema);

module.exports = Kanban;