const { authJwt } = require('../middleware')
const controller = require('../controllers/test.controller')

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        )
        next()
    })

    app.get("/test/public", controller.accessPublic)

    app.get("/test/authenticated", [authJwt.verifyToken], controller.accessAuthenticated)
}