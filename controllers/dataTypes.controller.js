const model = require('../models/dataTypes.model');
const { param } = require('express-validator');

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