const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pageSchema = new Schema({
  stackOrder: { type: Number, required: true, unique: true },
  backgroundImageUrl: { type: String },
  backgroundColor: { type: String, default: "000000" },
  columns: [ { type: Schema.Types.ObjectId, ref: "Column" } ]
});

const Page = mongoose.model("Page", pageSchema);

module.exports = Page;