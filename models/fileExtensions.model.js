const { db } = require("../config/db");

/**
 * SQL query: get specific file extension in the database
 * @param {number} id
 * @returns {Promise<QueryResult<any>>} Promise: result of the sql query
 */
function get_file_extension(id) {
    return new Promise((resolve, reject) => {
        var values = [id];
        const sql = "SELECT * \
                    FROM FileExtensions \
                    WHERE extension_id=$1"

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
 * SQL query: get specific file extension in the database with its name
 * @param {string} name
 * @returns {Promise<QueryResult<any>>} Promise: result of the sql query
 */
function get_file_extension_with_name(name) {
    return new Promise((resolve, reject) => {
        var values = [name];
        const sql = "SELECT * \
                    FROM FileExtensions \
                    WHERE ext_name=$1"

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
 * SQL query: get all found file extensions in the database
 * @returns {Promise<QueryResult<any>>} Promise: result of the sql query
 */
function get_all_file_extensions() {
    return new Promise((resolve, reject) => {
        var values = [];
        const sql = "SELECT * \
                    FROM FileExtensions"

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
    get_file_extension,
    get_file_extension_with_name,
    get_all_file_extensions
}
