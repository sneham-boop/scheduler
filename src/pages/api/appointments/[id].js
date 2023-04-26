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

      const result = await db.collection("appointments").findOneAndUpdate(
        { id: parseInt(id) },
        [
          {
            $set: {
              interview: null,
            },
          },
        ],
        {
          returnDocument: "after",
        }
      );

      const daysUpdate = await db.collection("days").findOneAndUpdate(
        { appointments: id },
        {
          $inc: {
            spots: 1,
          },
        },
        {
          returnDocument: "after",
        }
      );

      console.log("Deleted a document", result, daysUpdate);

      if (result.modifiedCount === 1 && daysUpdate.modifiedCount === 1)
        res.json(result);
      else
        res.json({
          message: `Failed to delete this appointment ${id}`,
          success: false,
        });
    }

    // Process a PUT request for appointment
    if (req.method === "PUT") {
      const { id } = req.query;
      const { interview } = req.body;
      console.log(
        "Update request for appointment received, id & interview",
        parseInt(id),
        interview
      );

      // res.json({id, interview});
      // return;
      const response = await db.collection("appointments").findOneAndUpdate(
        { _id: new ObjectId(id) },
        [
          {
            $set: {
              "interview.student": interview.student,
            },
          },
          {
            $set: {
              "interview.interviewer_id": interview.interviewer,
            },
          },
        ],
        {
          upsert: true,
          returnDocument: "after",
        }
      );
      console.log("Response back from database",response);

      res.json(response);
    }
  } catch (e) {
    console.error("We couldn't connect to the database.", e);
  }
}
