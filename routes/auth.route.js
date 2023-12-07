const { authJwt, validate } = require('../middleware')
const authController = require('../controllers/auth.controller')
const userController = require('../controllers/users.controller')

module.exports = function(app) {
    const router = require('express').Router()
    router.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })

    router.post("/signin", authController.validate('signin'), validate.validationFeedback, authController.signin);

    router.post("/reset-password", userController.validate('putUserPasswordToNull'), validate.validationFeedback, userController.putUserPasswordToNull);

    router.post("/update-password", [authJwt.verifyToken, authJwt.verifyIdentity], userController.validate('putUserPassword'), validate.validationFeedback, userController.putUserPassword);

    app.use('/auth', router);
}