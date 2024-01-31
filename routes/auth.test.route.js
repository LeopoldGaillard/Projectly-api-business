const { authJwt } = require('../middleware');
const controller = require('../controllers/test.controller');

module.exports = function(app) {
    const router = require('express').Router();
    router.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.get("/public", controller.accessPublic);

    router.get("/authenticated", [authJwt.verifyToken], controller.accessAuthenticated);

    router.get("/my-content", [authJwt.verifyToken, authJwt.verifyIdentity], controller.accessMyContent);

    router.get("/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.accessAdmin);

    app.use('/auth/test', router);
};