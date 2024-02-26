const { Schema, model } = require("mongoose");

const boardSchema = new Schema(
    {
       title: {
            type: String,
       },
       kanban: [{
            type: Schema.Types.ObjectId,
            ref: "Kanban"
       }],
       authorId: {
            type: Schema.Types.ObjectId,
            ref: "User"
       },
    //    sharedUsers: {
    //         type: [ Schema.Types.ObjectId ],
    //         ref: "User"
    //    }
    },
    {
        timestamps: true,
    }
)

const Board = model("Board", boardSchema);

module.exports = Board;