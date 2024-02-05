const model = require('../models/files.model');
const { param, body } = require('express-validator');

/**
 * HTTP request: post a new file in the database
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 */
function postFile(req, res) {
    const { title, fileurl, extensionid } = req;
    const { description, typeid, creator, externalid } = req.body

    const promise = model.create_file(title, description, fileurl, extensionid, typeid, creator, externalid);
    promise.then((values) => {
        res.status(201).send(values)
    }).catch((err) => {
        console.error(err.message)
        res.status(409).send({
            message: `Cannot create resource.`
        })
    })
}

/**
 * HTTP request: get all registered files in the database
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 */
function getAllFiles(req, res) {
    const promise = model.get_all_files();
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
 * HTTP request: get specified file corresponding to the given id if found in the database
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 */
function getFile(req, res) {
    const id = req.params.id;
    
    const promise = model.get_file(id);
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
 * HTTP request: put infos of specified file if found in the database
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 */
function putFileInfos(req, res) {
    const id = req.params.id;
    const { description, typeid } = req.body

    const promise = model.update_file(id, description, typeid);
    promise.then((values) => {
        res.status(204).send(values)
    }).catch((err) => {
        console.error(err.message)
        res.status(409).send({
            message: `Cannot update resource.`
        })
    })
}

/**
 * HTTP request: delete specified file if found in the database
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 */
function deleteFile(req, res) {
    // TODO: delete reference in firebase
    const id = req.params.id;
    
    const promise = model.delete_file(id)
    promise.then((values) => {
        res.status(204).send(values)
    }).catch((err) => {
        console.error(err.message)
        res.status(409).send({
            message: `Cannot delete resource.`
        })
    })
}

/**
 * Checks if the given request correspond to the expected parameters needed for the given function
 * @param {string} method name of the called function
 * @returns validation chain for the current request
 */
const validate = (method) => {
    switch (method) {
        case 'postFile': {
            return [
                body('description', `Missing description.`).escape().exists(),
                body('typeid', `Invalid type id.`).escape().exists().isNumeric(),
                body('creator', `Missing creator.`).escape().exists(),
                body('externalid', `Invalid external id.`).escape().exists().isNumeric()
            ]
        }
        case 'getFile': {
            return [
                param('id', `Invalid id.`).escape().exists().isNumeric()
            ]
        }
        case 'putFileInfos': {
            return [
                param('id', `Invalid id.`).escape().exists().isNumeric(),
                body('description', `Missing description.`).escape().exists(),
                body('typeid', `Invalid type id.`).escape().exists().isNumeric(),
            ]
        }
        case 'deleteFile': {
            return [
                param('id', `Invalid id.`).escape().exists().isNumeric()
            ]
        }
    }
}

module.exports = {
    postFile,
    getAllFiles,
    getFile,
    putFileInfos,
    deleteFile,
    validate
}