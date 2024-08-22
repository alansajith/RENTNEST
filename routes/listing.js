const express = require("express");
const router = express.Router();
const { listingSchema } = require("../schema.js");
const wrapasync = require("../utilis/wrapasync.js");
const listing = require("../models/listing.js");
const errorexpress = require("../utilis/ExpressError.js");

//Index Route
router.get("/", async (req, res) => {
  let alllistings = await listing.find({}); //.find({}) checks for everything
  res.render("index.ejs", { alllistings });
});

const validatelisting = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMessage = error.details.map((el) => el.message).join(",");
    throw new errorexpress(400, errMessage);
  } else {
    next();
  }
};
//new route
router.get("/new", (req, res) => {
  res.render("new.ejs");
});

//show Route
router.get(
  "/:id",
  wrapasync(async (req, res) => {
    let { id } = req.params;
    let details = await listing.findById(id);
    res.render("show.ejs", { details });
  })
);

//edit route
router.get(
  "/:id/edit",
  validatelisting,
  wrapasync(async (req, res) => {
    let { id } = req.params;
    let indlist = await listing.findById(id);
    res.render("edit.ejs", { indlist });
  })
);

//create route
router.post(
  "/",
  validatelisting,
  wrapasync(async (req, res, next) => {
    const newlisting = new listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");
  })
);

//update route
router.put(
  "/:id",
  validatelisting,
  wrapasync(async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndUpdate(id, {
      ...req.body.listing,
    }); //deconstruct
    res.redirect("/listings");
  })
);

//delete route
router.delete(
  "/:id",
  wrapasync(async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndDelete(id);
    res.redirect("/listings");
  })
);

module.exports = router;
