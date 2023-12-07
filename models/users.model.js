const { db } = require("../config/db")

function create_user(email, firstname, lastname) {
    return new Promise((resolve, reject) => {
        var values = [email, firstname, lastname];
        const sql = "INSERT INTO Users \
                    (email, firstname, lastname, passwordsetup, isadmin) \
                    VALUES ($1, $2, $3, true, false)"
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

function update_user(email, firstname, lastname) {
    return new Promise((resolve, reject) => {
        var values = [email, firstname, lastname];
        const sql = "UPDATE Users \
                    SET firstname = $2, lastname = $3 \
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

function update_user_password(email, password) {
    return new Promise((resolve, reject) => {
        var values = [email, password];
        const sql = "UPDATE Users \
                    SET password = $2, passwordsetup = false \
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

function reset_user_password(email, password) {
    return new Promise((resolve, reject) => {
        var values = [email];
        const sql = "UPDATE Users \
                    SET password = NULL, passwordsetup = true \
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

function promote_user_admin(email) {
    return new Promise((resolve, reject) => {
        var values = [email];
        const sql = "UPDATE Users \
                    SET isadmin = true \
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

function delete_user(email) {
    return new Promise((resolve, reject) => {
        var values = [email];
        const sql = "DELETE FROM Users \
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

module.exports = {
    create_user,
    get_user,
    get_all_users,
    update_user,
    update_user_password,
    reset_user_password,
    promote_user_admin,
    delete_user
}
