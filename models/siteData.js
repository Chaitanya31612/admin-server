let mongoose = require("mongoose");

const siteDataSchema = new mongoose.Schema({
  instituteName: { type: String, default: "dcrust" },
  footer: { type: String, default: "" },
  univLogo: { type: String, default: "https://i.ibb.co/j8ZLTT1/Univlogo.png" },
  navlinks: { type: Array, default: {} },
  subjects: { type: Array, default: [] },
  updated: { type: Number, default: Date.now },
  created: { type: Number, default: Date.now },
});

module.exports = mongoose.model("siteData", siteDataSchema);
