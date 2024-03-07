const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      trim: true
      // idea: poner un default para que no me de error en el front
    },
    lastName: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    userImage: {
      type: String,
      default: "/images/default-icon.png"
    },
    aboutMe: String,
    userKanban: {
      type: Schema.Types.ObjectId,
      ref: "Kanban"
    },
    userNotes: [{
      type: Schema.Types.ObjectId,
      ref: "Note"
    }]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
