const express = require("express");
const router = express.Router();

const educationalLevelController = require("../controllers/educationLevelController");
const instituitionLevelController = require("../controllers/instituitionLevelController");
const applicationInfoRouter = require("../controllers/applicationInfoController");
const nationalIdController = require("../controllers/nationalIDController");



router.use('/api/educationalLevel', educationalLevelController);
router.use('/api/instituitionLevel', instituitionLevelController);
router.use('/api/applicationInfo', applicationInfoRouter);
router.use('/api/nationalId', nationalIdController);



module.exports = router;