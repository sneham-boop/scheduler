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
      if (!id) {
        res.json({
          message: `Failed to delete this appt.`,
          success: false,
        });
      }

      const result = await db.collection("appointments").findOneAndUpdate(
        { _id: new ObjectId(id) },
        [
          
          {
            $set: {
              "interview.student": "",
            },
          },
          {
            $set: {
              "interview.interviewer_id": null,
            },
          },
        ],
        {
          returnDocument: "after",
        }
      );

      if (result.lastErrorObject.updatedExisting === true)
        res.json(result.value);
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
              "interview.interviewer_id": interview.interviewer_id,
            },
          },
        ],
        {
          upsert: true,
          returnDocument: "after",
        }
      );

      res.json(response);
    }
  } catch (e) {
    console.error("We couldn't connect to the database.", e);
  }
}
