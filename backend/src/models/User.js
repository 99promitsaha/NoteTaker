const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true, index: true },
    email: { type: String, unique: true, index: true },
    name: { type: String },
    avatarUrl: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
