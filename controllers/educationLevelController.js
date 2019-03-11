const express = require("express");
const educationalLevelRouter = express.Router();

educationalLevelRouter.get('/', async (req, res) => {
    return res.json({"status": "LIVE! Education Level Info"}).status(200);

});

educationalLevelRouter.get('/getAll', (req, res) => {
    require("../db/dbInit").GetConnection()
        .then((reslts) => {
            reslts.dbo.collection("EducationLevel").find({}).toArray((err, result) => {
                if (err) return res.json(err).status(500);
                reslts.db.close();
                return res.json(result).status(200)
            });
        });
});


module.exports = educationalLevelRouter