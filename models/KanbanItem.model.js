const { Schema, model } = require("mongoose");

const kanbanItemSchema = new Schema(
    {
       title: {
            type: String,
       },
       description: {
            type: String,
       },
       kanbanParent: {
            type: Schema.Types.ObjectId,
            ref: "Kanban"
       },
       authorId: {
          type: Schema.Types.ObjectId,
          ref: "User"
       }
    },
    {
        timestamps: true,
    }
)

const KanbanItem = model("KanbanItem", kanbanItemSchema);

module.exports = KanbanItem;