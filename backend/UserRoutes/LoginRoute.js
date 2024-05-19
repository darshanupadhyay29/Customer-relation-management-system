const express = require("express");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const uri = "mongodb://localhost:27017";
const dbName = "School";
const secretKey = "darsh"; // Ensure this matches your secret key used for signing tokens

const LoginRoute = async (req, res) => {
  const { email, password } = req.body;

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);

    const user = await db.collection("students").findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid email or password");
    }

    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "24h",
    });

    res.status(200).send({ message: "User logged in", token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  } finally {
    await client.close();
  }
};

module.exports = { LoginRoute };
