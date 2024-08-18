const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMAte = require("ejs-mate");
const wrapasync = require("./utilis/wrapasync.js");
const errorexpress = require("./utilis/ExpressError.js");
const { listingSchema } = require("./schema.js");

app.use(express.urlencoded({ extended: true })); //Middlewares sd
app.use(methodOverride("_method")); //Middlewares
app.engine("ejs", ejsMAte);
app.use(express.static(path.join(__dirname, "public")));

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
  let alllistings = await listing.find({}); //.find({}) checks for everything
  res.render("index.ejs", { alllistings });
});

//Home
app.get("/", (req, res) => {
  throw new errorexpress(404, "Page Not Found");
});

//new route
app.get("/listings/new", (req, res) => {
  res.render("new.ejs");
});

//show Route
app.get(
  "/listings/:id",
  wrapasync(async (req, res, next) => {
    let { id } = req.params;
    let details = await listing.findById(id);
    res.render("show.ejs", { details });
  })
);

//edit route
app.get(
  "/listings/:id/edit",
  wrapasync(async (req, res) => {
    let { id } = req.params;
    let indlist = await listing.findById(id);
    res.render("edit.ejs", { indlist });
  })
);

//create route
app.post(
  "/listings",
  wrapasync(async (req, res, next) => {
    listingSchema.validate(req.body);
    const newlisting = new listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");
  })
);

//update route
app.put(
  "/listings/:id",
  wrapasync(async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndUpdate(id, {
      ...req.body.listing,
    }); //deconstruct
    res.redirect("/listings");
  })
);

//delete route
app.delete(
  "/listings/:id",
  wrapasync(async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndDelete(id);
    res.redirect("/listings");
  })
);

app.all("*", (req, res, next) => {
  next(new errorexpress(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "something went wrong" } = err;
  res.render("error.ejs", { message, status });
});
