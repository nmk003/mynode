import {
  getAllTimersServiceByUserId,
  createTimerServiceByUserId,
} from "../models/timerModel.js";

export const getAllTimersByUserId = async (req, res) => {
  const { userid } = req.params;

  try {
    const response = await getAllTimersServiceByUserId(userid);
    if (response.rowCount > 0) {
      res.status(200).json({
        success: true,
        message: "Fetched Timers Successfully",
        timers: { results: response.rows, total: response.rows.length },
      });
    } else {
      res.status(200).json({
        success: true,
        message: "No Timers Found",
        timer: { results: response.rows, total: response.rows.length },
      });
    }
  } catch (error) {
    console.log("Error is fetching api", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createTimerByUserId = async (req, res) => {
  try {
    const response = await createTimerServiceByUserId(req.body);
    if (response.rowCount > 0) {
      res.status(201).json({
        success: true,
        message: "Timer Created Successfully",
        timer: response.rows[0],
      });
    } else {
      res.status(400).json({ success: false, message: "Require Task Data" });
    }
  } catch (error) {
    console.log("Error in createTimerByUserId api", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
