const express = require("express");
const adminRouter = express.Router();
const bcrypt = require("bcrypt");
const jsonwebtoken = require('jsonwebtoken');

adminRouter.get('/', async (req, res) => {
    return res.json({"status": "LIVE! Instituition Level Info"}).status(200);
});

adminRouter.post('/confirmToken', (req, res) => {
    const username = req.body.username;
    const token = req.body.token;
    require("../db/dbInit").GetConnection()
        .then((reslts) => {
            try{
                reslts.dbo.collection("AdminUser").findOne({ username, jwt: token }, (err, doc) => {
                    if (err) return res.json({error: err}).status(500)
                    if(doc){
                        return res.json({success : true}).status(200);
                    }
                })                
            } catch(e){
                console.log(e)
                return res.json({success : false}).status(500);
            }
        });


});


adminRouter.post('/addNewAdmin', (req, res) => {
    const body = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    require("../db/dbInit").GetConnection()
        .then((reslts) => {
            try{
                reslts.dbo.collection("AdminUser").findOne({ username: body.username}, (err, doc) => {
                    if (err) return res.json({error: err}).status(500)
                    if(doc == null){
                        reslts.dbo.collection("AdminUser").insertOne({
                            username : body.username,
                            password: bcrypt.hashSync(body.password, salt),
                        });
                        return res.json({success : true}).status(201);
                    } else{
                        return res.json({success: false, message: 'User already exists!'}).status(400)
                    }
                })                
            } catch(e){
                console.log(e)
                return res.json({success : false}).status(500);
            }
        });

})

function comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

function setJWT(data){
    const jwt = jsonwebtoken.sign(data, 'GHANATECHLAB');
    require("../db/dbInit").GetConnection()
    .then((reslts) => {
        reslts.dbo.collection('AdminUser').updateOne(
            { username: data.username },
            {
              $set: { "jwt": jwt },
              $currentDate: { lastModified: true }
            }
        )
    });
    return jwt;
}

adminRouter.post('/login', (req, res) => {
    var body = req.body;
    require("../db/dbInit").GetConnection()
        .then((reslts) => {
            reslts.dbo.collection("AdminUser").findOne({username: body.username}, (err, result) => {
                if (err) return res.json({error: err}).status(500)
                if( result == null) {
                    return res.json({message: "Username/Password Incorrect", success: false})
                }
                if(result.username){
                    let pass = comparePassword(body.password, result.password)
                    if(!pass){
                        return res.json({message: "Username/Password Incorrect", success: false})
                    }
                    else{
                        const jwt = setJWT({username: body.username, password: body.password, timeStamp: Date.now});
                        return res.json({success: true, data: { username: result.username, jwt }})
                    }
                }
            });
        });
});

module.exports = adminRouter