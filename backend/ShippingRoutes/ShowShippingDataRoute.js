const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017"; // Replace with your MongoDB URI

const dbName = "School";

const ShowShippingDataRoute = async (req, res) => {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Connect to the specific database
      const db = client.db(dbName);
       const currentid = req.user.userId;

    // Fetch data from the 'customers' collection
    const response = await db
      .collection("shippingData")
      .find({ userId: currentid })
      .toArray();

    // Send the fetched data as a response
    res.send(response);
    console.log(response);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    // Close the client
    await client.close();
  }
};

module.exports = { ShowShippingDataRoute };
