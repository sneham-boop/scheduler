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
    const db = client.db("colourly-db");

    // Process a DELETE request
    if (req.method === "DELETE") {
      const { id } = req.query;

      if (!id) {
        res.json({
          message: `Failed to delete this day.`,
          success: false,
        });
      }

      const result = await db
        .collection("days")
        .deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 1)
        res.json({
          message: `Successfully deleted document with id ${id}`,
          success: true,
        });
      else
        res.json({
          message: `Failed to delete this day ${id}`,
          success: false,
        });
    }

    // Process a GET request for days
    if (req.method === "GET") {
      const { id } = req.query;
      const days = await db
        .collection("days")
        .find({ _id: new ObjectId(id) })
        .toArray();

      res.json(days);
    }
  } catch (e) {
    console.error("We couldn't connect to the database.", e);
  }
}
