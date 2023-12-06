const { db } = require("../config/db")

function get_user(email) {
    return new Promise((resolve, reject) => {
        var values = [email];
        const sql = "SELECT * \
                    FROM Users \
                    WHERE email=$1"

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

function get_all_users() {
    return new Promise((resolve, reject) => {
        var values = [];
        const sql = "SELECT * \
                    FROM Users"

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
    get_user,
    get_all_users
}
