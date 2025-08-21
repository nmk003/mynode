import express from "express";
import Authentication from "../utility/authtoken.js";
import { getGenAI } from "../controllers/genaiController.js";

const router = express.Router();

router.post("/genai", Authentication, getGenAI);

export default router;
