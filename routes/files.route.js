const { authJwt, validate } = require('../middleware');
const controller = require('../controllers/files.controller');

module.exports = function(app) {
    const router = require('express').Router();
    router.post('/', [authJwt.verifyToken], controller.validate('postFile'), validate.validationFeedback, controller.postFile);

    router.get('/', [authJwt.verifyToken], controller.getAllFiles);

    router.get('/:id', [authJwt.verifyToken], controller.validate('getFile'), validate.validationFeedback, controller.getFile);

    router.put('/:id', [authJwt.verifyToken], controller.validate('putFileInfos'), validate.validationFeedback, controller.putFileInfos);

    router.delete('/:id', [authJwt.verifyToken], controller.validate('deleteFile'), validate.validationFeedback, controller.deleteFile);
    
    app.use('/files', router);
}
