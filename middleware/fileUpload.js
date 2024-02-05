const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
const { firebaseConfig } = require("../config/firebase");
const { giveCurrentDateTime } = require('../common/utils');
const fileExtModel = require('../models/fileExtensions.model');

initializeApp(firebaseConfig);

const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() });

/**
 * Middleware function to upload file to firebase before registering it to the database
 * @param {Request} req Request of the user
 * @param {Result} res Response to send to the user
 * @param {NextFunction} next Next function called in the flow of the request
 * @returns call the next function if everything is ok or else send an error result to the user
 */
const uploadFileToStorage = async (req, res, next) => {
    try {
        // We first verify file extension
        const extArray = req.file.mimetype.split("/");
        const extension = extArray[extArray.length - 1];
        
        const sqlRes = await fileExtModel.get_file_extension_with_name(extension);
        const fileExtID = sqlRes.rows[0].extension_id;

        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

        // Create file metadata
        const metadata = {
            contentType: req.file.mimetype,
        };

        // Upload the file in the bucket storage
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        // File public url
        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log('File successfully uploaded.');
        req.title = req.file.originalname;
        req.size = req.file.size;
        req.creationdate = Date.now();
        req.fileurl = downloadURL;
        req.extensionid = fileExtID;
        next();
    } catch (error) {
        console.error(error.message);
        return res.status(400).send({
            message: 'Cannot upload file.'
        });
    }
}

module.exports = { upload, uploadFileToStorage };