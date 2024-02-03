const model = require('../models/fileExtensions.model');
const { param } = require('express-validator');

/**
 * HTTP request: get all registered file extensions in the database
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 */
function getAllFileExtensions(req, res) {
    const promise = model.get_all_file_extensions();
    promise.then((values) => {
        res.status(200).send(values.rows)
    }).catch((err) => {
        console.error(err.message)
        res.status(404).send({
            message: `Cannot find resource.`
        })
    });
}

/**
 * HTTP request: get file extension corresponding to the given id if found
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 */
function getFileExtension(req, res) {
    const id = req.params.id;
    
    const promise = model.get_file_extension(id);
    promise.then((values) => {
        res.status(200).send(values.rows[0]);
    }).catch((err) => {
        console.error(err.message)
        res.status(404).send({
            message: `Cannot find resource.`
        })
    });
}

/**
 * Checks if the given request correspond to the expected parameters needed for the given function
 * @param {string} method name of the called function
 * @returns validation chain for the current request
 */
const validate = (method) => {
    switch (method) {
        case 'getFileExtension': {
            return [
                param('id', `Invalid id.`).escape().exists().isNumeric()
            ]
        }
    }
}

module.exports = {
    getAllFileExtensions,
    getFileExtension,
    validate
}