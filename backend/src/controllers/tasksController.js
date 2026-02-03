const { z } = require("zod");
const Task = require("../models/Task");

const taskSchema = z.object({
  title: z.string().min(1).max(200),
  noteId: z.string().optional().nullable(),
  completed: z.boolean().optional(),
  priority: z.enum(["low", "medium", "high"]).optional(),
  dueDate: z.string().optional().nullable()
});

async function getTasks(req, res) {
  const tasks = await Task.find({ userId: req.user.id })
    .sort({ completed: 1, dueDate: 1, updatedAt: -1 })
    .lean();
  return res.json({ tasks });
}

async function createTask(req, res) {
  const parsed = taskSchema.parse(req.body);
  const task = await Task.create({
    userId: req.user.id,
    noteId: parsed.noteId || null,
    title: parsed.title,
    completed: parsed.completed || false,
    priority: parsed.priority || "medium",
    dueDate: parsed.dueDate ? new Date(parsed.dueDate) : null
  });
  return res.status(201).json({ task });
}

async function updateTask(req, res) {
  const parsed = taskSchema.partial().parse(req.body);
  const update = { ...parsed };
  if (update.dueDate !== undefined) {
    update.dueDate = update.dueDate ? new Date(update.dueDate) : null;
  }
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    update,
    { new: true }
  );
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  return res.json({ task });
}

async function deleteTask(req, res) {
  const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  return res.json({ success: true });
}

module.exports = { getTasks, createTask, updateTask, deleteTask };
