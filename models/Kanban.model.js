const { Schema, model } = require("mongoose");

const kanbanSchema = new Schema(
    {
       title: {
            type: String,
       },
       kanbanItems: [{
            type: Schema.Types.ObjectId,
            ref: "KanbanItem"
       }],
       authorId: {
            type: Schema.Types.ObjectId,
            ref: "User"
       }
    },
    {
        timestamps: true,
    }
)

const Kanban = model("Kanban", kanbanSchema);

module.exports = Kanban;