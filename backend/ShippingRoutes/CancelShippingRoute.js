const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB URI

const dbName = "School";

const CancelShippingRoute = async (req, res) => {
    const cid = req.query.customerid;
    const pid = req.params.productid;
    
    const client = new MongoClient(uri);

    try {       
               
        await client.connect();
       
        const db = client.db(dbName);

        const result = await db.collection("shippingData").deleteOne({
            customerId: cid, // Field name as per your collection
            productId: pid, // Field name as per your collection
        });

        if (result.deletedCount === 1) {
            res.status(200).send({ message: "Shipping data canceled successfully" });
        } else {
            res.status(404).send({ message: "Shipping data not found" });
        }
    } catch (error) {
        res.status(500);
          res.send({ message: "An error occurred", error: error.message });
    } finally {
        await client.close();
    }
};

module.exports = {CancelShippingRoute}