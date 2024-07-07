const mongoose = require("mongoose");
const schema = mongoose.Schema;

const listingSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  descrp: {
    type: String,
  },
  image: {
    type: String,
    set: v === " " ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsalonlfc.com%2Fimage-not-found-2%2F&psig=AOvVaw0hOCXTa0LRBjMI6bUDJb_G&ust=1720444075120000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJja7-L_lIcDFQAAAAAdAAAAABAE" : v,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
});

const listing = mongoose.model("Listing", listingSchema);
module.exports = listing;
