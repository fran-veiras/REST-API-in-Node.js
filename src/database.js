import { MongoClient } from "mongodb";

export async function connect() {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017");
    const db = client.db("node-resapi");
    console.log("db is connected");
    return db;
  } catch (error) {
    console.log(error);
  }
}
