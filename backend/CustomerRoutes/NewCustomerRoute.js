const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

const dbName = "School";

const NewCustomerRoute = async (req, res) => {
    const { name, city, phone, email } = req.body;
    const userId = req.user.userId;

    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB server
        await client.connect();

        // Connect to the specific database
        const db = client.db(dbName);

    

        // Insert user data into the database
        await db.collection('customers').insertOne({
            name,
            city,
            phone,
            email,
            userId
        });
    

        console.log('customer data inserted successfully');
        res.status(200).send('customer data inserted successfully');
    } catch (error) {
        console.error('Error:', error);
     
        res.status(500).send('Internal Server Error');
    } finally {
        // Close the client
        await client.close();
    }
};

module.exports = {NewCustomerRoute}
