import express from "express";
import taskRoutes from "./routes/taskRoute.js";
import userRoutes from "./routes/userRoute.js";
import timerRoutes from "./routes/timerRoute.js";

import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config();

const port = process.env.PORT;
app.use(cors());
app.use(express.json());

app.use("/api", taskRoutes);
app.use("/api", userRoutes);
app.use("/api", timerRoutes);

app.listen(port, () => {
  console.log("Server is running or Port: " + port);
});
