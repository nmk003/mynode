import client from "../database.js";
import { v4 as uuidv4 } from "uuid";

export const getAllTimersServiceByUserId = async (userid) => {
  const result = await client.query(
    `SELECT * FROM timers
        WHERE userid = $1`,
    [userid]
  );
  return result;
};

export const createTimerServiceByUserId = async (task) => {
  const { userid, title, timer, lapse } = task;
  const id = uuidv4();
  const result = await client.query(
    `INSERT INTO timers(id, userid, title, timer, lapse)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [id, userid, title, timer, lapse]
  );
  return result;
};
