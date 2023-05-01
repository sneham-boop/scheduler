import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    // Connect to db
    const client = await clientPromise;
    if (!client) {
      res.json({ error: "Could not connect to database." });
      return;
    }
    const db = client.db("schedular");

    // Process a GET request
    if (req.method === "GET") {
      const interviewers = await db
        .collection("interviewers")
        .find({})
        .toArray();

      res.json(interviewers);
    }
  } catch (e) {
    console.error("We couldn't connect to the database.", e);
  }
}
