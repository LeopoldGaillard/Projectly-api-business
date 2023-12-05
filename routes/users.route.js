const { authJwt, validate } = require('../middleware')
const controller = require('../controllers/users.controller')

module.exports = app => {
    const router = require('express').Router()
    router.get('/', [authJwt.isAdmin], controller.getAllUsers)

    router.get('/me', [authJwt.verifyToken], controller.validate('getUser'), validate.validationFeedback, controller.getUser)
    
    app.use('/users', router)
}