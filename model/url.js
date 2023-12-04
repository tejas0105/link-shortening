const mongoose = require("mongoose");
const shortId = require("shortid");

const shortUrlSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectURL: {
    type: String,
    required: true,
  },
  visitHistory: [{ timestamp: { type: Number } }],
});

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);

module.exports = ShortUrl;
