const express = require("express");

const apiRoutes = express.Router();

// controllers
const AdminSiteData = require("../controllers/admin/AdminSiteData");

// api routes

apiRoutes.post("/addsitedata", AdminSiteData.addSiteDetails);

apiRoutes.post("/addnavlink", AdminSiteData.addNavLink);

module.exports = apiRoutes;
