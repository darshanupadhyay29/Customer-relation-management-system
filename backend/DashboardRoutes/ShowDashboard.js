const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

const dbName = "School";

const ShowDashboard = async (req, res) => {
    const client = new MongoClient(uri);
    

    try {
        // Connect to the MongoDB server
        await client.connect();

        // Connect to the specific database
        const db = client.db(dbName);
         const currentid = req.user.userId;

        // Fetch data from the 'customers' collection
        const customers = await db
          .collection("customers")
          .find({ userId: currentid })
          .toArray();

        if (customers.length === 0) {
            res.status(404).send("No customers found");
            return;
        }

        // Fetch data from the 'products' collection
        const products = await db
          .collection("products")
          .find({ userId: currentid })
          .toArray();

        if (products.length === 0) {
            res.status(404).send("No products found");
            return;
        }

        // Create an array to hold the response data
        const responseData = [];

        // Iterate over each customer
        for (const customer of customers) {
            const customId = customer._id.toString();

            // Fetch shipping data for the specific customer
            const shippingDataList = await db
                .collection("shippingData")
                .find({ customerId: customId })
                .toArray();

            // Iterate over shipping data
            for (const shippingData of shippingDataList) {
                const productid = shippingData.productId;

                // Find the product with the corresponding productId
                const product = products.find((p) => p._id.toString() === productid);

                if (product) {
                    // Push an object with key-value pairs into responseData
                    responseData.push({
                        name: customer.name,
                        city: customer.city,
                        phone: customer.phone,
                        address: shippingData.address,
                        productName: product.productName,
                        email: customer.email,
                    });
                }
            }
        }

        // Send the unified response
        res.json(responseData);
        console.log(responseData);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    } finally {
        // Close the client
        await client.close();
    }
};

module.exports = { ShowDashboard };