const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); // to parse post request

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

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

//Index Route
app.get("/listings", async (req, res) => {
  let alllistings = await listing.find({});
  res.render("index.ejs", { alllistings });
});

//create route
app.get("/listings/new", (req, res) => {
  res.render("new.ejs");
});



//show Route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let details = await listing.findById(id);
  res.render("show.ejs", { details });
});

app.post("/listings", async (req, res) => {
  let { title, description, image, price, location, country } = req.body;
  let newlisting = new listing({
    title: title,
    description: description,
    image: image,
    price: price,
    location: location,
    country: country,
  });
  await newlisting.save();
  console.log("New listing is added");
  res.redirect("/listings");
});