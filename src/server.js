import express, { json } from "express";
import IndexRoutes from "./routes/index.routes";
import TaskRoutes from "./routes/tasks.routes";

const app = express();

// settings
app.set("port", process.env.PORT || 4000);

// middlewares
app.use(json());

// routes
app.use(IndexRoutes);
app.use("/Tasks", TaskRoutes);

export default app;
