const config = require('../config/auth')
const model = require('../models/users.model');
const jwt = require('jsonwebtoken')
const { body } = require('express-validator');
const { sendMail } = require('../common/utils');
require('dotenv').config();

function postUser(req, res) {
    const { email, firstname, lastname } = req.body

    const promise = model.create_user(email, firstname, lastname)
    promise.then((values) => {
        const token = jwt.sign({ email : email }, config.secret2, { expiresIn: 900 }) // 15 minutes token
        
        sendMail({
            to: `${email}`,
            subject: "Account Verification Link",
            text: `Hello, ${firstname + ' ' + lastname} ! You have been registered in Projectly by an admin.
            Please setup your password by clicking this link :
            ${process.env.PASSWORD_SETUP_URL}/password-reset?token=${token} `,
        });

        res.status(201).send(values)
    }).catch((err) => {
        console.error(err.message)
        res.status(409).send({
            message: `Cannot create resource.`
        })
    })
}

function getAllUsers(req, res) {
    const promise = model.get_all_users();
    promise.then((values) => {
        res.status(200).send(values.rows)
    }).catch((err) => {
        console.error(err.message)
        res.status(404).send({
            message: `Cannot find resource.`
        })
    });
}

function getUser(req, res) {
    const email = req.body.email;
    
    const promise = model.get_user(email);
    promise.then((values) => {
        res.status(200).send(values.rows)
    }).catch((err) => {
        console.error(err.message)
        res.status(404).send({
            message: `Cannot find resource.`
        })
    });
}

function putUser(req, res) {
    const { email, firstname, lastname } = req.body
    
    const promise = model.update_user(email, firstname, lastname)
    promise.then((values) => {
        res.status(204).send(values)
    }).catch((err) => {
        console.error(err.message)
        res.status(409).send({
            message: `Cannot create resource.`
        })
    })
}

function putUserPassword(req, res) {
    const { email, password } = req.body
    
    const promise = model.update_user_password(email, password)
    promise.then((values) => {
        res.status(204).send(values)
    }).catch((err) => {
        console.error(err.message)
        res.status(409).send({
            message: `Cannot update resource.`
        })
    })
}

function putUserPasswordToNull(req, res) {
    const { email } = req.body
    
    const promise = model.reset_user_password(email)
    promise.then((values) => {
        res.status(204).send(values)
    }).catch((err) => {
        console.error(err.message)
        res.status(409).send({
            message: `Cannot update resource.`
        })
    })
}

function putUserRoleToAdmin(req, res) {
    const { email } = req.body
    
    const promise = model.promote_user_admin(email)
    promise.then((values) => {
        res.status(204).send(values)
    }).catch((err) => {
        console.error(err.message)
        res.status(409).send({
            message: `Cannot update resource.`
        })
    })
}

function deleteUser(req, res) {
    const { email } = req.body
    
    const promise = model.delete_user(email)
    promise.then((values) => {
        res.status(204).send(values)
    }).catch((err) => {
        console.error(err.message)
        res.status(409).send({
            message: `Cannot delete resource.`
        })
    })
}

const validate = (method) => {
    switch (method) {
        case 'postUser': {
            return [
                body('email', `Invalid email format.`).escape().exists().isEmail(),
                body('firstname', `Invalid first name.`).escape().exists(),
                body('lastname', `Invalid last name.`).escape().exists()
            ]
        }
        case 'getUser': {
            return [
                body('email', `Invalid email format.`).escape().exists().isEmail()
            ]
        }
        case 'putUser': {
            return [
                body('email', `Invalid email format.`).escape().exists().isEmail(),
                body('firstname', `Invalid first name.`).escape().exists(),
                body('lastname', `Invalid last name.`).escape().exists()
            ]
        }
        case 'putUserPassword': {
            return [
                body('email', `Invalid email format.`).escape().exists().isEmail(),
                body('password', `Invalid password. Try something stronger.`).escape().exists().isStrongPassword()
            ]
        }
        case 'putUserPasswordToNull': {
            return [
                body('email', `Invalid email format.`).escape().exists().isEmail()
            ]
        }
        case 'putUserRoleToAdmin': {
            return [
                body('email', `Invalid email format.`).escape().exists().isEmail()
            ]
        }
        case 'deleteUser': {
            return [
                body('email', `Invalid email format.`).escape().exists().isEmail()
            ]
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
} 