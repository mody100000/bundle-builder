import express from "express";
import cors from "cors";
import path from "path";
import productsRouter from "./routes/products.routes";

const app = express();

app.use(cors());
app.use(express.json());

// Serve static images from the public/images folder
app.use("/images", express.static(path.join(__dirname, "../public/images")));

app.use("/api/products", productsRouter);

export default app;

