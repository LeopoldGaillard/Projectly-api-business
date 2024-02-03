const { db } = require("../config/db");

/**
 * SQL query: creates a file reference in the database with given metadata
 * @param {string} title
 * @param {string} description
 * @param {string} url
 * @param {number} extensionId
 * @param {number} typeId
 * @param {string} creatorName
 * @param {number} externalId
 * @returns {Promise<QueryResult<any>>} Promise: result of the sql query
 */
function create_file(title, description, url, extensionId, typeId, creatorName, externalId) {
    return new Promise((resolve, reject) => {
        var values = [title, description, url, extensionId, typeId, creatorName, externalId];
        const sql = "INSERT INTO Files \
                    (title, file_desc, file_url, file_ext_id, data_type_id, creator_name, external_id) \
                    VALUES ($1, $2, $3, $4, $5, $6, $7)"
        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}

/**
 * SQL query: get specific file in the database
 * @param {number} id
 * @returns {Promise<QueryResult<any>>} Promise: result of the sql query
 */
function get_file(id) {
    return new Promise((resolve, reject) => {
        var values = [id];
        const sql = "SELECT * \
                    FROM Files \
                    WHERE file_id=$1"

        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}

/**
 * SQL query: get all found files in the database
 * @returns {Promise<QueryResult<any>>} Promise: result of the sql query
 */
function get_all_files() {
    return new Promise((resolve, reject) => {
        var values = [];
        const sql = "SELECT * \
                    FROM Files"

        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}

/**
 * SQL query: update file metadata in the database
 * @param {number} id
 * @param {string} description
 * @param {number} typeId
 * @returns {Promise<QueryResult<any>>} Promise: result of the sql query
 */
function update_file(id, description, typeId) {
    return new Promise((resolve, reject) => {
        var values = [id, description, typeId];
        const sql = "UPDATE Files \
                    SET file_desc=$2, data_type_id=$3 \
                    WHERE file_id=$1"

        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}

/**
 * SQL query: delete file reference in the database
 * @param {number} id
 * @returns {Promise<QueryResult<any>>} Promise: result of the sql query
 */
function delete_file(id) {
    return new Promise((resolve, reject) => {
        var values = [id];
        const sql = "DELETE FROM files \
                    WHERE file_id=$1"

        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result);
            }
        });
    });
}

module.exports = {
    create_file,
    get_file,
    get_all_files,
    update_file,
    delete_file
}
