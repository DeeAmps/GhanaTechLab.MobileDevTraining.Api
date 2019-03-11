const express = require("express");
const instituitionLevelRouter = express.Router();

instituitionLevelRouter.get('/', async (req, res) => {
    return res.json({"status": "LIVE! Instituition Level Info"}).status(200);
});

instituitionLevelRouter.get('/getAll', (req, res) => {
    require("../db/dbInit").GetConnection()
        .then((reslts) => {
            reslts.dbo.collection("Instituition").find({}).toArray((err, result) => {
                if (err) res.json(err).status(500);
                reslts.db.close();
                return res.json(result).status(200)
            });
        });
});

module.exports = instituitionLevelRouter