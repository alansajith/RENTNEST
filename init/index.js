const mongoose = require("mongoose");
const initdata = require("./data.js");
const listing = require("../models/listing.js");

main()
  .catch((err) => console.log(err))
  .then(() => {
    console.log("connection successfull with the db");
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/RENTNEST");
}

const initDB = async () => {
  await listing.insertMany(initdata.data);
  console.log("Data is initialized");
};

initDB();
