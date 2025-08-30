import express from "express";
import {
  getAllUsers,
  createUser,
  loginUser,
  userforgotpassword,
} from "../controllers/userController.js";
import Authentication from "../utility/authtoken.js";
const router = express.Router();

router.get("/users", getAllUsers);
router.post("/user", createUser);
router.post("/auth/login", loginUser);
router.post("/auth/forgotpassword", userforgotpassword);

export default router;
