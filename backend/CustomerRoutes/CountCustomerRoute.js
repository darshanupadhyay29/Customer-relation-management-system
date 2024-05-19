const { MongoClient } = require("mongodb");

require("dotenv").config();

const uri = process.env.MONGODB_URI;


const dbName = "School";

const CountCustomerRoute = async (req, res) => {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Connect to the specific database
      const db = client.db(dbName);
      const currentid = req.user.userId;


    // Fetch data from the 'customers' collection
    const response = await db
      .collection("customers")
      .countDocuments({ userId: currentid });

    // Send the fetched data as a response
    res.send({ response });
    console.log(response);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    // Close the client
    await client.close();
  }
};

module.exports = { CountCustomerRoute };
