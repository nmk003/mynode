import client from "../database.js";
import { v4 as uuidv4 } from "uuid";

export const getAllUsersService = async () => {
  const result = await client.query("SELECT * FROM users");
  return result;
};

export const createUserService = async (userData) => {
  const { username, password, role, userid } = userData;
  const id = uuidv4();
  const result = await client.query(
    `INSERT INTO users (id, username, password, role, userid, createdate)
    VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
    [id, username, password, role, userid]
  );
  return result;
};
