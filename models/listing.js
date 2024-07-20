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
    default: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df",
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
