let mongoose = require("mongoose");

const siteDataSchema = new mongoose.Schema({
  instituteName: { type: String, default: "dcrust" },
  footer: { type: String, default: "" },
  univLogo: { type: String, default: "https://ibb.co/BfKgttS" },
  navlinks: { type: Object, default: {} },
  subjects: { type: Array, default: [] },
  updated: { type: Number, default: Date.now },
  created: { type: Number, default: Date.now },
});

module.exports = mongoose.model("siteData", siteDataSchema);
