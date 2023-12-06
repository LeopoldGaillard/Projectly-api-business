const express = require('express')
const { getPgVersion } = require('./config/db');
const bodyParser = require('body-parser')
const { rateLimit } = require('express-rate-limit')
require('dotenv').config();

const app = express()
const port = process.env.PORT ? process.env.PORT : 3000

const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // *1000 for seconds *60 for minutes
	limit: 50, // Limit each IP to {max} requests per {windowMs}
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept")
    next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

require("./routes/auth.route.js")(app)
require("./routes/test.route.js")(app)
require("./routes/users.route.js")(app)

app.get('/', (req,res) => {
    res.status(200).send({
        message: `Welcome to the Projectly business API !`
    })
})

app.get('*', (req,res) => {
    res.status(404).send({
        message: `Cannot find resource`
    })
})

app.listen(port, () => {
    getPgVersion().then((version) => {
        console.log("Postgres version: " + version);
        console.log(`Server started on port ${port}`);
    }).catch((err) => {console.error(err)});
})
