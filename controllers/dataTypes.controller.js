const model = require('../models/dataTypes.model');
const { param } = require('express-validator');

/**
 * HTTP request: get all data types registered in the database
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 */
function getAllDataTypes(req, res) {
    const promise = model.get_all_data_types();
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
 * HTTP request: get data type corresponding to the given id if found
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 */
function getDataType(req, res) {
    const id = req.params.id;
    
    const promise = model.get_data_type(id);
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
        case 'getDataType': {
            return [
                param('id', `Invalid id.`).escape().exists().isNumeric()
            ]
        }
    }
}

module.exports = {
    getAllDataTypes,
    getDataType,
    validate
}