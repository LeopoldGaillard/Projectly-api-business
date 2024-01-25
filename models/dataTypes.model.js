const { db } = require("../config/db");

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

function get_all_data_types() {
    return new Promise((resolve, reject) => {
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
