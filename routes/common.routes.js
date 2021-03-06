const express = require("express");

const apiRoutes = express.Router();

// controllers
const AdminSiteData = require("../controllers/admin/AdminSiteData");

// api routes
apiRoutes.get("/getsitedata", AdminSiteData.getSiteDetails);

module.exports = apiRoutes;
