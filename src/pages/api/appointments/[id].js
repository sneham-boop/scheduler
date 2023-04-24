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

    // Process a DELETE request
    if (req.method === "DELETE") {
      const { id } = req.query;
      console.log("This is the id in req.body", req.query);
      if (!id) {
        console.log("No appt ID was found!");
        res.json({
          message: `Failed to delete this appt.`,
          success: false,
        });
      }
      console.log("Appt id to be deleted received at server.", id);

      const result = await db
        .collection("appointments")
        .deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 1)
        res.json({
          message: `Successfully deleted document with id ${id}`,
          success: true,
        });
      else
        res.json({
          message: `Failed to delete this appointment ${id}`,
          success: false,
        });
    }

    // Process a GET request for appointment
    if (req.method === "GET") {
      const { id } = req.query;
      const appointment = await db
        .collection("appointments")
        .find({ _id: new ObjectId(id) })
        .toArray();

      res.json(appointment);
    }

    // Process a PUT request for appointment
    if (req.method === "PUT") {
      const { id } = req.query;
      const { interview } = req.body;
      console.log("Update request for appointment received, id & interview", id, interview)
      const appointment = await db
        .collection("appointments")
        .findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: { interview: interview } }
        )
        .toArray();
      res.json(appointment);
    }
  } catch (e) {
    console.error("We couldn't connect to the database.", e);
  }
}
