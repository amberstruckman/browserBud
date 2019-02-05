const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocaleSchema = new Schema({
  query: { type: String, required: true },
  city: {type: String, required: false},
  postalCode: {type: String, required: false},
  latitude: {type: Number, required: false},
  longitude: {type: Number, required: false},
  created: {type: Date, default: Date.now, required: true},
  retired: {type: Date, required: false},
  userId: {type: Schema.ObjectId, required: false},
  locationName: {type: String, default: "home"}
});
LocaleSchema.index({"userId": 1, "locationName": 1});
const Locales = mongoose.model("locales", LocaleSchema);

module.exports = Locales;