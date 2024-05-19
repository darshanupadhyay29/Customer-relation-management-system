const express = require('express');
const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

const dbName = "School";

const ShowCustomersRoute = async (req, res) => {
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB server
        await client.connect();

        // Connect to the specific database
        const db = client.db(dbName);

        // Fetch data from the 'customers' collection
         const currentid = req.user.userId;
        const response = await db
          .collection("customers")
          .find({ userId: currentid })
          .toArray();

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

module.exports = {ShowCustomersRoute}
