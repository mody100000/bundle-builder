import { Router } from "express";
import products from "../data/products.json";

const router = Router();

router.get("/", (_, res) => {
  res.json(products);
});

export default router;
