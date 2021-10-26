const express = require("express");

const apiRoutes = express.Router();

// controllers
const AdminSiteData = require("../controllers/admin/AdminSiteData");

// api routes

apiRoutes.post("/addsitedata", AdminSiteData.addSiteDetails);

apiRoutes.post("/addnavlink", AdminSiteData.addNavLink);

apiRoutes.post("/removenavlink", AdminSiteData.removeNavLink);

apiRoutes.post("/addsubject", AdminSiteData.addSubject);

apiRoutes.post("/removesubject", AdminSiteData.removeSubject);

apiRoutes.post("/addsubjectopic", AdminSiteData.addSubjectTopic);

apiRoutes.post("/addsubjecsubtopic", AdminSiteData.addSubjectSubtopic);

apiRoutes.post("/updatedetails", AdminSiteData.updateSiteData);

apiRoutes.post("/removetopic", AdminSiteData.removeTopic);

module.exports = apiRoutes;
