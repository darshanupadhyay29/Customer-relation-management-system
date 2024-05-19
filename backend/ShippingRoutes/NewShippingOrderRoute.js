const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017"; // Replace with your MongoDB URI

const dbName = "School";

const NewShippingOrderRoute = async (req, res) => {
    const { address, city, pincode, customerId, productId } = req.body;
     const userId = req.user.userId;

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Connect to the specific database
    const db = client.db(dbName);

    // Insert user data into the database
    await db.collection("shippingData").insertOne({
      address,
      city,
      pincode,
      customerId,
      productId,
      userId
    });

    console.log("customer data inserted successfully");
    res.status(200).send("customer data inserted successfully");
  } catch (error) {
    console.error("Error:", error);

    res.status(500).send("Internal Server Error");
  } finally {
    // Close the client
    await client.close();
  }
};

module.exports = {NewShippingOrderRoute}
