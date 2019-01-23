const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const linkSchema = new Schema({
  stackOrder: { type: Number, required: true, unique: true },
  websiteUrl: { type: String, required: true },
  websiteName: { type: String }
});

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;