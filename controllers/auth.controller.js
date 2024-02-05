const config = require('../config/auth')
const userModel = require('../models/users.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { body } = require('express-validator')
const { sendMail } = require('../common/utils');

/**
 * HTTP request: sign in the application
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 */
const signin = (req, res) => {
    userModel.get_user_with_password(req.body.email).then(data => {
        if (data.rows.length) {
            if (data.rows[0].passwordsetup) {
                return res.status(403).send({
                    accessToken: null,
                    message: "User password is not set up !"
                });
            }

            const validPassword = bcrypt.compareSync(
                req.body.password,
                data.rows[0].password
            );

            if (!validPassword) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid password!"
                });
            }

            const token = jwt.sign({ email : data.rows[0].email }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                accessToken: token
            });
        } else {
            res.status(404).send({
                message: "User not found."
            });
        }
    });
}

/**
 * HTTP request: if the given email is valid, sends an email to the user to recover their account
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 */
function forgotPassword(req, res) {
    const { email } = req.body;

    const promise = userModel.get_user(email);
    promise.then(() => {
        const token = jwt.sign({ email : email }, config.secret2, { expiresIn: 900 }); // 15 minutes token
        
        userModel.get_user(email).then((value) => {
            sendMail({
                to: `${email}`,
                subject: "Password Setup Link",
                text: `Hello, ${value.rows[0].firstname + ' ' + value.rows[0].lastname} ! It seems you have asked a password change.
                You can change it by clicking this link :
                ${process.env.PASSWORD_SETUP_URL}?token=${token} \n
                If you didn't ask for a password change you can ignore this and nothing will happen.`,
            });

            res.status(201).send({
                message: `Mail has been sent to change password.`
            });
        })
    }).catch((err) => {
        console.error(err.message);
        res.status(404).send({
            message: `This email does not correspond to an account in our services.`
        });
    });
}

/**
 * Checks if the given request correspond to the expected parameters needed for the given function
 * @param {string} method name of the called function
 * @returns validation chain for the current request
 */
const validate = (method) => {
    switch (method) {
        case 'signin': {
            return [
                body('email', `Email is not conform.`).escape().exists().isEmail(),
                body('password', `Password is not conform.`).escape().exists()
            ];
        }
        case 'forgotPassword': {
            return [
                body('email', `Email is not conform.`).escape().exists().isEmail()
            ];
        }
    }
}

module.exports = {
    signin,
    forgotPassword,
    validate
};