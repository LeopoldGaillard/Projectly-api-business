const jwt = require('jsonwebtoken')
const config = require('../config/auth')
const userModel = require('../models/users.model')

/**
 * Middleware function to check if token is correct
 */
verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]
    if (!token) {
        return res.status(400).send({
            message: "No token provided!"
        })
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            })
        }

        req.email = decoded.email
        next()
    })
}

isAdmin = (req, res, next) => {
    if(!req.email) {
        res.status(400).send({
            message: "No email provided."
        })
        return;
    }

    userModel.get_user(req.email).then(data => {
        if (!data.rows.length) {
            res.status(404).send({
                message: "User not found."
            })
            return;
        }

        if (data.rows[0] && data.rows[0].isadmin) {
            next();
            return;
        }

        res.status(403).send({
            message: "Require Admin Role!"
        })
        return;
    })
}

module.exports = {
    verifyToken,
    isAdmin
}