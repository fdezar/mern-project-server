const { Schema, model } = require("mongoose");

const kanbanSchema = new Schema(
    {
       title: {
            type: String,
       },
       cards: [{
            type: Schema.Types.ObjectId,
            ref: "Card"
       }],
       user: {
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