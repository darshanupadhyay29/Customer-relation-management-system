const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

require("dotenv").config();

const uri = process.env.MONGODB_URI;

// Database Name
const dbName = 'School';

const DeleteCustomerRoute = async (req, res) => {
    const id = req.params.customerid;

    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB server
        await client.connect();

        // Connect to the specific database
        const db = client.db(dbName);

        // Delete the customer with the specified email
        await db.collection('customers').deleteOne({ _id: new ObjectId(id) });
        console.log(id);

        res.status(200).send('Customer deleted successfully');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    } finally {
        // Close the client
        await client.close();
    }
};

module.exports = {DeleteCustomerRoute}