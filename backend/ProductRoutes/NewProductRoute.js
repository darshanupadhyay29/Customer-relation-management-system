const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017"; // Replace with your MongoDB URI

const dbName = "School";

const NewProductRoute = async (req, res) => {
  const { productName, quantity, price, MRP } = req.body;
  const userId = req.user.userId; // Assuming req.user is populated by middleware

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);

    await db.collection("products").insertOne({
      productName,
      quantity,
      price,
      MRP,
      userId, // Add the user ID to the product document
    });

    res.status(200).send("Product data inserted successfully");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
};


module.exports = { NewProductRoute };
