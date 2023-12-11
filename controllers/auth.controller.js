const config = require('../config/auth')
const userModel = require('../models/users.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { body } = require('express-validator')

const signin = (req, res) => {
    userModel.get_user_with_password(req.body.email).then(data => {
        if (data.rows.length) {
            if (data.rows[0].passwordsetup) {
                return res.status(403).send({
                    accessToken: null,
                    message: "User password is not set up !"
                })
            }

            const validPassword = bcrypt.compareSync(
                req.body.password,
                data.rows[0].password
            )

            if (!validPassword) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid password!"
                })
            }

            const token = jwt.sign({ email : data.rows[0].email }, config.secret, {
                expiresIn: 86400 // 24 hours
            })

            res.status(200).send({
                accessToken: token
            })
        } else {
            res.status(404).send({
                message: "User not found."
            })
        }
    })
}

const validate = (method) => {
    switch (method) {
        case 'signin': {
            return [
                body('email', `Email is not conform.`).escape().exists().isEmail(),
                body('password', `Password is not conform.`).escape().exists()
            ]
        }
    }
}

module.exports = {
    signin,
    validate
}