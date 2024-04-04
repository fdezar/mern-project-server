const { Schema, model } = require("mongoose");

const toDoListItemSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        content: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
)

const ToDoListItem = model("ToDoListItem", toDoListItemSchema);

module.exports = ToDoListItem;