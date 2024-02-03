const { db } = require("../config/db");

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

function get_all_files() {
    return new Promise((resolve, reject) => {
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

function update_file(id, title, description, url, extensionId, typeId, creatorName, externalId) {
    return new Promise((resolve, reject) => {
        var values = [id, title, description, url, extensionId, typeId, creatorName, externalId];
        const sql = "UPDATE Files \
                    SET title=$2, file_desc=$3, file_url=$4, file_ext_id=$5, data_type_id=$6, creator_name=$7, external_id=$8 \
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
