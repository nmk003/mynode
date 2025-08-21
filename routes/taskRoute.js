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

router.get("/tasks", Authentication, getAllTasks);
router.post("/task", Authentication, createTask);
router.put("/taskstatus/:id", Authentication, updateTaskStatus);
router.get("/task/:id", Authentication, getTaskById);
router.delete("/task/:id", Authentication, deleteTaskById);
router.get("/tasks/:userid", Authentication, getAllTasksByUserId);

export default router;
