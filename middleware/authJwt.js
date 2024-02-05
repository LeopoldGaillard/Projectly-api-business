const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const userModel = require('../models/users.model');

/**
 * Middleware function to check if connexion token is correct
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 * @param {NextFunction} next Next function called in the flow of the request
 * @returns call the next function if everything is ok or send an error result to the user
 */
const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        token = req.headers["authorization"];

        if (!token) {
            return res.status(400).send({
                message: "No token provided!"
            });
        }

        // Remove "Bearer "
        token = token.substring(7);
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }

        req.email = decoded.email;
        next();
    });
}

/**
 * Middleware function to check if mailer token is correct
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 * @param {NextFunction} next Next function called in the flow of the request
 * @returns call the next function if everything is ok or send an error result to the user
 */
const verifyTokenMailer = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        token = req.headers["authorization"];

        if (!token) {
            return res.status(400).send({
                message: "No token provided!"
            });
        }

        // Remove "Bearer "
        token = token.substring(7);
    }

    jwt.verify(token, config.secret2, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }

        req.email = decoded.email;
        next();
    });
}

/**
 * Middleware function to check if the user is accessing their own resources
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 * @param {NextFunction} next Next function called in the flow of the request
 * @returns call the next function if everything is ok or send an error result to the user
 */
const verifyIdentity = (req, res, next) => {
    if (!req.email) {
        return res.status(401).send({
            message: "Unauthorized."
        });
    }

    if (!req.body.email) {
        /* return res.status(401).send({
            message: "No email provided."
        }); */

        // Here we also certify that the user is going to access his resources.
        req.body.email = req.email;
    }

    if (req.email != req.body.email) {
        return res.status(403).send({
            message: "Forbidden."
        });
    }

    next();
}

/**
 * Middleware function to check if the user is an admin
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 * @param {NextFunction} next Next function called in the flow of the request
 * @returns call the next function if everything is ok or send an error result to the user
 */
const isAdmin = (req, res, next) => {
    if(!req.email) {
        res.status(400).send({
            message: "No email provided."
        });
        return;
    }

    userModel.get_user(req.email).then(data => {
        if (!data.rows.length) {
            res.status(404).send({
                message: "User not found."
            });
            return;
        }

        if (data.rows[0] && data.rows[0].isadmin) {
            next();
            return;
        }

        res.status(403).send({
            message: "Require Admin Role!"
        });
        return;
    })
}

module.exports = {
    verifyToken,
    verifyTokenMailer,
    verifyIdentity,
    isAdmin
};