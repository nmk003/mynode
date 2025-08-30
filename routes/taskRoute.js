import express from "express";
import {
  getAllTasks,
  createTask,
  updateTaskStatus,
  getAllTasksByUserId,
  getTaskById,
  deleteTaskById,
} from "../controllers/taskController.js";
import Authentication from "../utility/authtoken.js";
import { getAllTasksServiceByUserId } from "../models/taskModel.js";
const router = express.Router();

router.get("/tasks", getAllTasks);
router.post("/task", createTask);
router.put("/taskstatus/:id", updateTaskStatus);
router.get("/task/:id", getTaskById);
router.delete("/task/:id", deleteTaskById);
router.get("/tasks/:userid", getAllTasksByUserId);

export default router;
