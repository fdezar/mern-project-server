const { Schema, model } = require("mongoose");

const noteSchema = new Schema(
    {
        users: {
            type: [ Schema.Types.ObjectId ],
            ref: "User"
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        headerImage: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true,
    }
)

const Note = model("Note", noteSchema);

module.exports = Note;