const express = require('express');
const { getPgVersion } = require('./config/db');
const bodyParser = require('body-parser');
const { rateLimit } = require('express-rate-limit');
require('dotenv').config();

const app = express();
const port = process.env.PORT ? process.env.PORT : 3000;

// Request rate limiter to prevent a single user to make lots of requests in a short window time
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // *1000 for seconds *60 for minutes
	limit: 50, // Limit each IP to {limit} requests per {windowMs} minutes
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to all requests
app.use(limiter);

// Control access of the API to make it only accessible by the front website
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.FRONT_URL);
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Register routes to the app
require("./routes/auth.route.js")(app);
require("./routes/auth.test.route.js")(app);
require("./routes/users.route.js")(app);

// Root message
app.get('/', (req,res) => {
    res.status(200).send({
        message: `Welcome to the Projectly business API !`
    });
});

// If the route isn't registered yet, it means that it doesn't exist so it is a 404
app.get('*', (req,res) => {
    res.status(404).send({
        message: `Cannot find resource`
    });
});

// Start the server
const server = app.listen(port, () => {
    getPgVersion().then((version) => {
        console.log("Postgres version: " + version);
        console.log(`Server started on port ${port}`);
        app.emit('ready');
    }).catch((err) => {
        console.error(err);
        process.exit(1);
    });
});

module.exports = { app, server };