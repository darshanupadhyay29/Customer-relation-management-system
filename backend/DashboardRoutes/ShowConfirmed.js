const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

const dbName = "School";

const ShowConfirmed = async (req, res) => {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Connect to the specific database
      const db = client.db(dbName);
      const currentid = req.user.userId;


    const count = await db
      .collection("shippingData")
      .countDocuments({ userId: currentid });

    res.json({ count });
  } catch (error) {
    console.log(error);
  } finally {
    // Close the client
    await client.close();
  }
};

module.exports = {ShowConfirmed}
