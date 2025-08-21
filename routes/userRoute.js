import express from "express";
import {
  getAllUsers,
  createUser,
  loginUser,
  userforgotpassword,
} from "../controllers/userController.js";
import Authentication from "../utility/authtoken.js";
const router = express.Router();

router.get("/users", Authentication, getAllUsers);
router.post("/user", Authentication, createUser);
router.post("/auth/login", loginUser);
router.post("/auth/forgotpassword", userforgotpassword);

export default router;
