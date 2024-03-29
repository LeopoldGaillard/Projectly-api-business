const config = require('../config/auth')
const model = require('../models/users.model');
const jwt = require('jsonwebtoken')
const { body } = require('express-validator');
const { sendMail } = require('../common/utils');
require('dotenv').config();

/**
 * HTTP request: creates a user if the given email isn't already in use and sends an email for password setup 
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 */
function postUser(req, res) {
    const { email, firstname, lastname } = req.body;

    const userPromise = model.get_user(email);
    userPromise.then((values) => {
        // If we find something, we have already created this user.
        const foundUser = values.rows[0];
        if (foundUser) {
            res.status(409).send({
                message: `Email already in use.`
            });
        } else {
            // This means we didn't find a user so we can create user (go to catch)
            throw new Error("User not found");
        }
    }).catch((err) => {
        // If we didn't find anything, we can create the user.
        const promise = model.create_user(email, firstname, lastname);
        promise.then((values) => {
            const token = jwt.sign({ email : email }, config.secret2, { expiresIn: 900 }); // 15 minutes token
            
            sendMail({
                to: `${email}`,
                subject: "Password Setup Link",
                text: `Hello, ${firstname + ' ' + lastname} ! You have been registered in Projectly by an admin.
                Please setup your password by clicking this link :
                ${process.env.PASSWORD_SETUP_URL}?token=${token} `,
            });

            res.status(201).send(values);
        }).catch((err) => {
            console.error(err.message);
            res.status(409).send({
                message: `Cannot create resource.`
            });
        });
    });
}

/**
 * HTTP request: get all users found in the database
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 */
function getAllUsers(req, res) {
    const promise = model.get_all_users();
    promise.then((values) => {
        res.status(200).send(values.rows);
    }).catch((err) => {
        console.error(err.message);
        res.status(404).send({
            message: `Cannot find resource.`
        });
    });
}

/**
 * HTTP request: get specific user if found in the database
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 */
function getUser(req, res) {
    const email = req.body.email;
    
    const promise = model.get_user(email);
    promise.then((values) => {
        res.status(200).send(values.rows[0]);
    }).catch((err) => {
        console.error(err.message);
        res.status(404).send({
            message: `Cannot find resource.`
        });
    });
}

/**
 * HTTP request: update user if found in the database
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 */
function putUser(req, res) {
    const { email, firstname, lastname } = req.body;
    
    const promise = model.update_user(email, firstname, lastname);
    promise.then((values) => {
        res.status(204).send(values);
    }).catch((err) => {
        console.error(err.message);
        res.status(409).send({
            message: `Cannot create resource.`
        });
    });
}

/**
 * HTTP request: update password of a user if the user is found in the database
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 */
function putUserPassword(req, res) {
    const { email } = req;
    const { password } = req.body;
    
    const promise = model.update_user_password(email, password);
    promise.then((values) => {
        res.status(204).send(values);
    }).catch((err) => {
        console.error(err.message);
        res.status(409).send({
            message: `Cannot update resource.`
        });
    });
}

/**
 * HTTP request: reset user password to null and sends them an email to set password up again
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 */
function putUserPasswordToNull(req, res) {
    const { email } = req.body;
    
    const promise = model.reset_user_password(email);
    promise.then((values) => {
        const token = jwt.sign({ email : email }, config.secret2, { expiresIn: 900 }); // 15 minutes token

        model.get_user(email).then((value) => {
            sendMail({
                to: `${email}`,
                subject: "Password Setup Link",
                text: `Hello, ${value.rows[0].firstname + ' ' + value.rows[0].lastname} ! An admin has reset your password.
                Please setup your new password by clicking this link :
                ${process.env.PASSWORD_SETUP_URL}?token=${token} `,
            });

            res.status(204).send(values);
        });
    }).catch((err) => {
        console.error(err.message);
        res.status(409).send({
            message: `Cannot update resource.`
        });
    });
}

/**
 * HTTP request: promotes user to admin if it is found and has a password
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 */
function putUserRoleToAdmin(req, res) {
    const { email } = req.body;
    
    const promiseUser = model.get_user(email);
    promiseUser.then((values) => {
        const foundUser = values.rows[0];
        if (foundUser) {
            if (!foundUser.passwordsetup) {
                const promise = model.promote_user_admin(email);
                promise.then((values) => {
                    res.status(204).send(values);
                }).catch((err) => {
                    console.error(err.message);
                    res.status(409).send({
                        message: `Cannot update resource.`
                    });
                })
            } else {
                // If the password isn't set up we can't promote the user
                res.status(409).send({
                    message: `Cannot promote a user that has not set their password up.`
                });
            }
        } else {
            throw new Error('Cannot find user.');
        }
    }).catch((err) => {
        console.error(err.message);
        res.status(404).send({
            message: `Cannot find user to promote.`
        });
    });
}

/**
 * HTTP request: deletes a user
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 */
function deleteUser(req, res) {
    const { email } = req.body;
    
    const promise = model.delete_user(email);
    promise.then((values) => {
        res.status(204).send(values);
    }).catch((err) => {
        console.error(err.message);
        res.status(409).send({
            message: `Cannot delete resource.`
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
        case 'postUser': {
            return [
                body('email', `Invalid email format.`).escape().exists().isEmail(),
                body('firstname', `Invalid first name.`).escape().exists(),
                body('lastname', `Invalid last name.`).escape().exists()
            ];
        }
        case 'getUser': {
            return [
                body('email', `Invalid email format.`).escape().exists().isEmail()
            ];
        }
        case 'putUser': {
            return [
                body('email', `Invalid email format.`).escape().exists().isEmail(),
                body('firstname', `Invalid first name.`).escape().exists(),
                body('lastname', `Invalid last name.`).escape().exists()
            ];
        }
        case 'putUserPassword': {
            return [
                body('password', `Invalid password. Try something stronger.`).escape().exists().isStrongPassword()
            ];
        }
        case 'putUserPasswordToNull': {
            return [
                body('email', `Invalid email format.`).escape().exists().isEmail()
            ];
        }
        case 'putUserRoleToAdmin': {
            return [
                body('email', `Invalid email format.`).escape().exists().isEmail()
            ];
        }
        case 'deleteUser': {
            return [
                body('email', `Invalid email format.`).escape().exists().isEmail()
            ];
        }
    }
}

module.exports = {
    postUser,
    getAllUsers,
    getUser,
    putUser,
    putUserPassword,
    putUserPasswordToNull,
    putUserRoleToAdmin,
    deleteUser,
    validate
} ;