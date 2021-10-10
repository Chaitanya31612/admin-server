const express = require("express");

const router = express.Router();

const commonRoutes = require("./common.routes");
const adminRoutes = require("./admin.routes");

// router.use('/', commonRoutes)
router.use("/admin", adminRoutes);
module.exports = router;
