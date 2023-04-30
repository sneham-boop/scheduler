import clientPromise from "../../../../lib/mongodb";

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
      const appointments = await db
        .collection("appointments")
        .find({})
        .toArray();

      res.json(appointments);
    }
  } catch (e) {
    console.error("We couldn't connect to the database.", e);
  }
}
