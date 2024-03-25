const { Schema, model } = require("mongoose");

const cardSchema = new Schema(
    {
       text: {
            type: String,
       },
       kanbanParent: {
            type: Schema.Types.ObjectId,
            ref: "Kanban"
       }
    },
    {
        timestamps: true,
    }
)

const Card = model("Card", cardSchema);

module.exports = Card;