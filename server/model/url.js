const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true,
    },
    shortId: {
      type: String,
      unique: true,
    },
    alias: {
      type: String,
      unique: true,
    },
    shortLink: { type: String },
    urls: [{ url: { type: String } }],
    redirectURL: {
      type: String,
      unique: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);

module.exports = ShortUrl;
