const { authJwt, validate } = require('../middleware')
const controller = require('../controllers/users.controller')

module.exports = function(app) {
    const router = require('express').Router();
    router.post('/', [authJwt.verifyToken, authJwt.isAdmin], controller.validate('postUser'), validate.validationFeedback, controller.postUser);

    router.get('/', [authJwt.verifyToken, authJwt.isAdmin], controller.getAllUsers);

    router.get('/me', [authJwt.verifyToken, authJwt.verifyIdentity], controller.validate('getUser'), validate.validationFeedback, controller.getUser);

    router.put('/me', [authJwt.verifyToken, authJwt.verifyIdentity], controller.validate('putUser'), validate.validationFeedback, controller.putUser);

    router.put('/', [authJwt.verifyToken, authJwt.isAdmin], controller.validate('putUser'), validate.validationFeedback, controller.putUser);

    router.put('/promote', [authJwt.verifyToken, authJwt.isAdmin], controller.validate('putUserRoleToAdmin'), validate.validationFeedback, controller.putUserRoleToAdmin);

    router.delete('/', [authJwt.verifyToken, authJwt.isAdmin], controller.validate('deleteUser'), validate.validationFeedback, controller.deleteUser);
    
    app.use('/users', router);
}