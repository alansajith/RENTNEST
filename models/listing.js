const { urlencoded } = require("express");
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const listingSchema = new schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    default:
      "https://unsplash.com/photos/an-abstract-image-of-a-white-object-with-a-gray-background-Hp-KRSsV4H0",
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
