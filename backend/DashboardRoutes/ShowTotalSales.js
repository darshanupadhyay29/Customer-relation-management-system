const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

const dbName = "School";

const ShowTotalSales = async (req, res) => {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();

    // Connect to the specific database
      const db = client.db(dbName);
      const currentid = req.user.userId;

    // Fetch all products
    const products = await db
      .collection("products")
      .find({ userId: currentid })
      .toArray();

    // Calculate total sales
    let totalSales = 0;
    for (const product of products) {
      totalSales += parseFloat(product.price); // Use parseFloat in case the price is a decimal value
    }

    // Send the total sales as a JSON response
    res.json({ totalSales });
  } catch (error) {
    console.error("Error calculating total sales:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // Close the client
    await client.close();
  }
};

module.exports = { ShowTotalSales };
