import express from "express";
import cors from "cors";
import path from "path";
import camerasRouter from "./routes/cameras.routes";
import plansRouter from "./routes/plans.routes";

const app = express();
const projectRoot = path.join(__dirname, "../");

app.use(cors());
app.use(express.json());

app.use("/images", express.static(path.join(projectRoot, "public/images")));

app.use("/api/cameras", camerasRouter);
app.use("/api/plans", plansRouter);

export default app;
