const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./routes/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMAte = require("ejs-mate");
const errorexpress = require("./utilis/ExpressError.js");

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

//Home
app.get("/", (req, res) => {
  throw new errorexpress(404, "Page Not Found");
});

app.use("/listings", listing);

app.all("*", (req, res, next) => {
  next(new errorexpress(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "something went wrong" } = err;
  res.render("error.ejs", { message, status });
});
