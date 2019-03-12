const express = require("express");
const router = express.Router();

const educationalLevelController = require("../controllers/educationLevelController");
const instituitionLevelController = require("../controllers/instituitionLevelController");
const applicationInfoRouter = require("../controllers/applicationInfoController");
const nationalIdController = require("../controllers/nationalIDController");
const regionController = require("../controllers/regionController");
const adminController = require("../controllers/adminController");

router.use('/api/educationalLevel', educationalLevelController);
router.use('/api/instituitionLevel', instituitionLevelController);
router.use('/api/applicationInfo', applicationInfoRouter);
router.use('/api/nationalId', nationalIdController);
router.use('/api/regions', regionController);
router.use('/api/admin', adminController);




module.exports = router;