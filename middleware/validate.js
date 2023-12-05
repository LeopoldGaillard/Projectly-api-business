const { validationResult } = require('express-validator')

/**
 * Middleware function to check if inputs are corrects
 */
validationFeedback = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    next()
}

module.exports = {
    validationFeedback
}
