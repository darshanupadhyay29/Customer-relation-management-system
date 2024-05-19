const express = require("express");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const uri = "mongodb://localhost:27017";
const dbName = "School";
const secretKey = "darsh"; // Ensure this matches your secret key used for signing tokens

const SignUpRoute = async (req, res) => {
  const { name, email, password } = req.body;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);

    const user = await db.collection("students").findOne({ email });

    if (user) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection("students").insertOne({
      name,
      email,
      password: hashedPassword,
    });

    const newUser = await db.collection("students").findOne({ email });
    const token = jwt.sign({ userId: newUser._id }, secretKey, {
      expiresIn: "24h",
    });

    res.status(200).send({ message: "User data inserted successfully", token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
};

module.exports = { SignUpRoute };
