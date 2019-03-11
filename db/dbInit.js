const MongoClient = require("mongodb");
var fs = require("fs");

var contents = fs.readFileSync("./config/config.json");
var config = JSON.parse(contents);


const GetConnStr = () => {
    return config.connectionString;
}

const GetConnection = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(GetConnStr(), { useNewUrlParser: true }, function(err, db) {
            if (err) return reject(err);
            var dbo = db.db("NationalMobileDevTraining");
            return resolve({dbo: dbo, db: db})
        })
    });
}


module.exports = {
    GetConnection,
    GetConnStr
}

