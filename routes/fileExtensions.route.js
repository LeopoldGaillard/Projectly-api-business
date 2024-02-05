const { authJwt, validate } = require('../middleware');
const controller = require('../controllers/fileExtensions.controller');

module.exports = function(app) {
    const router = require('express').Router();

    router.get('/', [authJwt.verifyToken], controller.getAllFileExtensions);

    router.get('/:id', [authJwt.verifyToken], controller.validate('getFileExtension'), validate.validationFeedback, controller.getFileExtension);

    app.use('/files/extensions', router);
}
