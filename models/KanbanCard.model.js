const { Schema, model } = require("mongoose");

const kanbanCardSchema = new Schema(
    {
       title: {
            type: String,
       },
       description: {
            type: String,
       },
       status: {
        
       }
    },
    {
        timestamps: true,
    }
)

const KanbanCard = model("Kanbancard", kanbanCardSchema);

module.exports = KanbanCard;