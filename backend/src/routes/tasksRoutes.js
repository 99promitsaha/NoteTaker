const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require("../controllers/tasksController");

const router = express.Router();

router.use(authMiddleware);
router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
