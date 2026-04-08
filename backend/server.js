import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { connectDB } from "./config/db.js";
import todosRoutes from "./routes/todos.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8020;

const __dirname = path.resolve();

app.use(cors());
app.use(express.json()); // allow us to accept JSON data in the req.body

app.use("/api/todos", todosRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

export default app;
