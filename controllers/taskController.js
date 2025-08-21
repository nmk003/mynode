import {
  getAllTasksService,
  createTaskService,
  updateTaskServiceStatus,
  getAllTasksServiceByUserId,
  getAllTaskServiceById,
  deleteTaskByIdService,
} from "../models/taskModel.js";

export const getAllTasks = async (req, res) => {
  try {
    const response = await getAllTasksService();
    if (response.rows.length > 0) {
      res.status(200).json({
        success: true,
        message: "Tasks fetched successfully",
        tasks: { results: response.rows, total: response.rows.length },
      });
    } else {
      res.status(404).json({ success: false, message: "No tasks found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllTasksByUserId = async (req, res) => {
  try {
    const { userid } = req.params;
    const response = await getAllTasksServiceByUserId(userid);
    if (response.rows.length > 0) {
      res.status(200).json({
        success: true,
        message: "Tasks fetched successfully",
        tasks: { results: response.rows, total: response.rows.length },
      });
    } else {
      res.status(404).json({ success: false, message: "No tasks found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, userid } = req.body;
    const allTasks = await getAllTasksService();
    const isTaskExist = allTasks.rows.find((t) => {
      if (t.title === title && t.userid === userid) {
        return true;
      }
      return false;
    });

    if (isTaskExist) {
      return res.status(400).json({ message: "Task already exists" });
    } else {
      const response = await createTaskService(req.body);
      res.status(201).json({
        success: true,
        message: "Task Created Successfully",
        task: response.rows[0],
      });
    }
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const response = await updateTaskServiceStatus({
      id,
      status,
    });
    if (response.rowCount > 0) {
      res.status(200).json({
        success: true,
        message: "Task updated successfully",
        task: response.rows[0],
      });
    } else {
      res.status(404).json({ success: false, message: "Task not found" });
    }
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteTaskById = async (req, res) => {
  try {
    const response = await deleteTaskByIdService(req.params.id);
    if (response.rowCount > 0) {
      res.status(200).json({
        success: true,
        message: "Task Deleted successfully",
      });
    } else {
      res.status(404).json({ success: false, message: "Task not found" });
    }
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getAllTaskServiceById(id);
    if (response.rows.length > 0) {
      res.status(200).json({
        success: true,
        task: response.rows[0],
      });
    } else {
      res.status(404).json({ success: false, message: "No tasks found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
