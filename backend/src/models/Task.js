const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    noteId: { type: mongoose.Schema.Types.ObjectId, ref: "Note", default: null },
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    },
    dueDate: { type: Date, default: null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
