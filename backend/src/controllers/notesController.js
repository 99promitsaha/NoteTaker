const { z } = require("zod");
const sanitizeHtml = require("sanitize-html");
const Note = require("../models/Note");

const noteSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().optional(),
  tags: z.array(z.string().max(30)).optional(),
  pinned: z.boolean().optional()
});

const sanitize = (value) =>
  sanitizeHtml(value || "", {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "ul", "ol", "li", "code", "pre", "br"],
    allowedAttributes: {
      a: ["href", "target", "rel"]
    },
    allowedSchemes: ["http", "https", "mailto"]
  });

async function getNotes(req, res) {
  const notes = await Note.find({ userId: req.user.id })
    .sort({ pinned: -1, updatedAt: -1 })
    .lean();
  return res.json({ notes });
}

async function createNote(req, res) {
  const parsed = noteSchema.parse(req.body);
  const note = await Note.create({
    userId: req.user.id,
    title: parsed.title || "Untitled",
    content: sanitize(parsed.content),
    tags: parsed.tags || [],
    pinned: parsed.pinned || false
  });
  return res.status(201).json({ note });
}

async function updateNote(req, res) {
  const parsed = noteSchema.parse(req.body);
  const update = { ...parsed };
  if (update.content !== undefined) {
    update.content = sanitize(update.content);
  }

  const note = await Note.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    update,
    { new: true }
  );
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  return res.json({ note });
}

async function deleteNote(req, res) {
  const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  return res.json({ success: true });
}

module.exports = { getNotes, createNote, updateNote, deleteNote };
