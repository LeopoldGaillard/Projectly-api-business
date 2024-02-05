const { validationResult } = require('express-validator');

/**
 * Middleware function to check if the request is passing the validation chain
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 * @param {NextFunction} next Next function called in the flow of the request
 * @returns call the next function if everything is ok or send an error result to the user
 */
validationFeedback = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    next();
}

module.exports = {
    validationFeedback
};