const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/main")
const cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use("/", routes);


let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})