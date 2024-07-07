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
      "https://images.fineartamerica.com/images-medium-large-5/two-palm-trees-on-an-exotic-beach-in-gerisima.jpg",
    set: (v) =>
      v === " "
        ? "https://images.fineartamerica.com/images-medium-large-5/two-palm-trees-on-an-exotic-beach-in-gerisima.jpg"
        : v,
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
