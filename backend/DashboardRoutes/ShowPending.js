const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

const dbName = "School";

const ShowPending = async (req, res) => {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Connect to the specific database
      const db = client.db(dbName);
      const currentid = req.user.userId;

    const custCount = await db
      .collection("customers")
      .countDocuments({ userId: currentid });
    const shipCount = await db
      .collection("shippingData")
      .countDocuments({ userId: currentid });

    const data = custCount - shipCount;

    res.json({ data });
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};


module.exports = {ShowPending}