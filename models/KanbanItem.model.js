const { Schema, model } = require("mongoose");

const kanbanItemSchema = new Schema(
    {
       title: {
            type: String,
       },
       description: {
            type: String,
       },
       status: {
            type: String,
            enum: ['To Do', 'In Progress', 'Completed']
       }
    },
    {
        timestamps: true,
    }
)

const KanbanItem = model("KanbanItem", kanbanItemSchema);

module.exports = KanbanItem;