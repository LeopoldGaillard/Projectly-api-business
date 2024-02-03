const model = require('../models/files.model');
const { param, body } = require('express-validator');

function postFile(req, res) {
    const { title, description, fileurl, extensionid, typeid, creator, externalid } = req.body

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

function putFileInfos(req, res) {
    const id = req.params.id;
    const { title, description, fileurl, extensionid, typeid, creator, externalid } = req.body

    const promise = model.update_file(id, title, description, fileurl, extensionid, typeid, creator, externalid);
    promise.then((values) => {
        res.status(204).send(values)
    }).catch((err) => {
        console.error(err.message)
        res.status(409).send({
            message: `Cannot update resource.`
        })
    })
}

function deleteFile(req, res) {
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

const validate = (method) => {
    switch (method) {
        case 'postFile': {
            return [
                body('title', `Missing title.`).escape().exists(),
                body('description', `Missing description.`).escape().exists(),
                body('filepath', `Missing file path.`).escape().exists(),
                body('extensionid', `Invalid extension id.`).escape().exists().isNumeric(),
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
                body('title', `Missing title.`).escape().exists(),
                body('description', `Missing description.`).escape().exists(),
                body('extensionid', `Invalid extension id.`).escape().exists().isNumeric(),
                body('typeid', `Invalid type id.`).escape().exists().isNumeric(),
                body('creator', `Missing creator.`).escape().exists(),
                body('externalid', `Invalid external id.`).escape().exists().isNumeric()
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