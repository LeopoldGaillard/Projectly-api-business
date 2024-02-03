const { db } = require("../config/db");

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
    get_all_file_extensions
}
