const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

const dbName = "School";

const UpdateCustomerRoute = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db(dbName);
        const result = await db
            .collection("customers")
            .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

        if (result.matchedCount > 0) {
            res.status(200).send("Update successful!Refresh to see updated data");
        } else {
            res.status(404).send("Student not found");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    } finally {
        await client.close();
    }
};

module.exports = UpdateCustomerRoute
