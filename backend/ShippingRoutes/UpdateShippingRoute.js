const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://localhost:27017";
const dbName = "School";

const UpdateShippingRoute = async (req, res) => {
    const  pid  = req.params.pid;
    const  cid  = req.query.customerid;
  const updateData = req.body;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const result = await db
      .collection("shippingData")
      .updateOne({ productId:pid,customerId:cid }, { $set: updateData });

    if (result.matchedCount > 0) {
      res.status(200).send("Update successful!Refresh to see updated data");
    } else {
      res.status(404).send("Data not found");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
};

module.exports = UpdateShippingRoute;
