const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017"; // Replace with your MongoDB URI

const dbName = "School";

const ShowProductRoute = async (req, res) => {
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB server
        await client.connect();

        // Connect to the specific database
        const db = client.db(dbName);

        // Fetch data from the 'customers' collection
        const currentid = req.user.userId;
       
        const response = await db.collection('products').find({userId:currentid}).toArray();

        // Send the fetched data as a response
        res.status(200).json(response);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        // Close the client
        await client.close();
    }
};

module.exports = {ShowProductRoute}