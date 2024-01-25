const model = require('../models/fileExtensions.model');
const { param } = require('express-validator');

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