import client from "../database.js";
import { v4 as uuidv4 } from "uuid";

export const getAllTasksService = async () => {
  const result = await client.query(
    "SELECT * FROM tasks ORDER BY createdate ASC"
  );
  return result;
};

export const getAllTasksServiceByUserId = async (userid) => {
  const result = await client.query(
    `SELECT * FROM tasks WHERE userid = $1 ORDER BY createdate ASC`,
    [userid]
  );
  return result;
};

export const getAllTaskServiceById = async (id) => {
  const result = await client.query(`SELECT * FROM tasks WHERE id = $1`, [id]);
  return result;
};

export const createTaskService = async (taskData) => {
  const { title, description, userid } = taskData;
  const id = uuidv4();
  const result = await client.query(
    "INSERT INTO tasks (id, title, description, userid, createdate) VALUES ($1, $2, $3, $4, NOW()) RETURNING *",
    [id, title, description, userid]
  );
  return result;
};

export const updateTaskServiceStatus = async (taskData) => {
  const { id, status } = taskData;
  const result = await client.query(
    "UPDATE tasks SET status = $1 WHERE id = $2",
    [status, id]
  );

  return result;
};

export const deleteTaskByIdService = async (id) => {
  const result = await client.query(
    `
      DELETE FROM tasks
      WHERE id = $1`,
    [id]
  );
  return result;
};
