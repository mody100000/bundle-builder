import { Router } from "express";
import cameras from "../data/cameras.json";

const router = Router();

router.get("/", (_, res) => {
  res.json(cameras);
});

export default router;
