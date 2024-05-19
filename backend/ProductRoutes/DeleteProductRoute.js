const { MongoClient, ObjectId } = require('mongodb');


const uri = "mongodb://localhost:27017"; // Replace with your MongoDB URI

const dbName = "School";

const DeleteProductRoute = async (req, res) => {
    const id = req.params.productid;

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB server
        await client.connect();

        // Connect to the specific database
        const db = client.db(dbName);

        // Delete the customer with the specified email
        await db.collection('products').deleteOne({ _id: new ObjectId(id) });

        res.status(200).send('Customer deleted successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        // Close the client
        await client.close();
    }
};

module.exports = {DeleteProductRoute}
