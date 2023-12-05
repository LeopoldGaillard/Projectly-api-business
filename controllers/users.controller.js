const model = require('../models/users.model');
const { body } = require('express-validator');

function getAllUsers(req, res) {
    const promise = model.get_all_users();
    promise.then((values) => {
        res.status(200).send(values.rows)
    }).catch((err) => {
        console.error(err.message)
        res.status(404).send({
            message: `Cannot find resource`
        })
    });
}

function getUser(req, res) {
    const email = req.email;
    
    const promise = model.get_user(email);
    promise.then((values) => {
        res.status(200).send(values.rows)
    }).catch((err) => {
        console.error(err.message)
        res.status(404).send({
            message: `Cannot find resource`
        })
    });
}

const validate = (method) => {
    switch (method) {
        case 'getUser': {
            return [
                body('email', `Email is not conform.`).escape().exists().isEmail()
            ]
        }
    }
}

module.exports = {
    getAllUsers,
    getUser,
    validate
} 