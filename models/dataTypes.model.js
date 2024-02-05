const { db } = require("../config/db");

/**
 * SQL query: get specific data type in the database
 * @param {number} id
 * @returns {Promise<QueryResult<any>>} Promise: result of the sql query
 */
function get_data_type(id) {
    return new Promise((resolve, reject) => {
        var values = [id];
        const sql = "SELECT * \
                    FROM DataTypes \
                    WHERE type_id=$1"

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
 * SQL query: get all found data types in the database
 * @returns {Promise<QueryResult<any>>} Promise: result of the sql query
 */
function get_all_data_types() {
    return new Promise((resolve, reject) => {
        var values = [];
        const sql = "SELECT * \
                    FROM DataTypes"

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
    get_data_type,
    get_all_data_types
}
