import express from "express";
import Authentication from "../utility/authtoken.js";
import {
  getAllTimersByUserId,
  createTimerByUserId,
} from "../controllers/timerController.js";

const router = express.Router();

router.get("/timers/:userid", getAllTimersByUserId);
router.post("/timer", createTimerByUserId);

export default router;
