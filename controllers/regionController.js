const express = require("express");
const regionsRouter = express.Router();

regionsRouter.get('/', async (req, res) => {
    return res.json({"status": "LIVE! IDs"}).status(200);
});

regionsRouter.get('/getAll', (req, res) => {
    require("../db/dbInit").GetConnection()
        .then((reslts) => {
            reslts.dbo.collection("Region").find({}).toArray((err, result) => {
                if (err) res.json(err).status(500);
                reslts.db.close();
                return res.json(result).status(200)
            });
        });
});

module.exports = regionsRouter