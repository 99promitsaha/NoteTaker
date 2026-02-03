const mongoose = require("mongoose");

async function connectDb() {
  const uri = process.env.MONGO_URL;
  if (!uri) {
    throw new Error("MONGO_URL is not set");
  }
  await mongoose.connect(uri, {
    autoIndex: true
  });
  console.log("MongoDB connected");
}

module.exports = { connectDb };
