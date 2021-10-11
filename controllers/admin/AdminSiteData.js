const SiteDataSchema = require("../../models/siteData");

module.exports.getSiteDetails = async (req, res) => {
  try {
    const details = await SiteDataSchema.find({});
    res.status(200).json(details);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

module.exports.addSiteDetails = async (req, res) => {
  try {
    const check = { instituteName: "dcrust" };
    const details = await SiteDataSchema.findOne(check);
    console.log(details);
    console.log("req.body is", req.body);
    // create details

    await SiteDataSchema.findOneAndUpdate(
      check,
      req.body,
      { upsert: true },
      function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send("Succesfully saved.");
      }
    )
      .clone()
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

module.exports.addNavLink = async (req, res) => {
  try {
    const check = { instituteName: "dcrust" };
    const details = await SiteDataSchema.findOne(check);
    console.log(details);
    console.log("req.body is", req.body);
    // create details

    console.log([...details.navlinks, req.body]);
    await SiteDataSchema.updateOne(
      check,
      { $set: { navlinks: [...details.navlinks, req.body] } },
      function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send("Succesfully saved.");
      }
    )
      .clone()
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};
