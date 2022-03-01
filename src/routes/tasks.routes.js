import { Router } from "express";

const router = Router();

// Database connection
import { connect } from "../database";
import { ObjectId } from "mongodb";

router.get("/", async (req, res) => {
  const db = await connect();
  const response = await db.collection("tasks").find({}).toArray();
  res.json(response);
});

router.post("/", async (req, res) => {
  const db = await connect();
  const task = {
    title: req.body.title,
    description: req.body.description,
  };
  const result = await db.collection("tasks").insertOne(task);
  console.log(result);
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const db = await connect();
  const response = await db.collection("tasks").findOne({ _id: ObjectId(id) });
  res.json(response);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const db = await connect();
  const result = await db.collection("tasks").deleteOne({ _id: ObjectId(id) });
  res.json({ message: `Task ${id} deleted`, result });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const db = await connect();
  const updateTask = {
    title: req.body.title,
    description: req.body.description,
  };
  const response = await db
    .collection("tasks")
    .updateOne({ _id: ObjectId(id) }, { $set: updateTask });
  res.json({ message: `Task ${id} updated` });
});

export default router;
