const express = require("express");
const app = express();
const mongoose = require("mongoose");

main()
  .catch((err) => console.log(err))
  .then(() => {
    console.log("connection successfull with the db");
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/RENTNEST");
}



app.listen(8080, () => {
  console.log("Server is Listening on port 8080");
});


