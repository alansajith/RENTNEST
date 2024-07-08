const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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

//new route
app.get("/listings/new", (req, res) => {
  res.render("new.ejs");
});

//show Route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let details = await listing.findById(id);
  res.render("show.ejs", { details });
});

//edit route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  let indlist = await listing.findById(id);
  res.render("edit.ejs", { indlist });
});

//create route
app.post("/listings", async (req, res) => {
  const newlisting = new listing(req.body.listing);
  await newlisting.save();
  res.redirect("/listings");
});

//update route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const updatelisting = await listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  }); //deconstruct
  res.redirect("/listings");
});
