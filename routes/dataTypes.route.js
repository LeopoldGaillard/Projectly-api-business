const { authJwt, validate } = require('../middleware');
const controller = require('../controllers/dataTypes.controller');

module.exports = function(app) {
    const router = require('express').Router();

    router.get('/', [authJwt.verifyToken], controller.getAllDataTypes);

    router.get('/:id', [authJwt.verifyToken], controller.validate('getDataType'), validate.validationFeedback, controller.getDataType);
    
    app.use('/datatypes', router);
}
