const { hashPassword } = require("../common/utils");
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
        const sql = "SELECT Email, \
                    FirstName, \
                    LastName, \
                    PasswordSetup, \
                    IsAdmin \
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

function get_user_with_password(email) {
    return new Promise((resolve, reject) => {
        var values = [email];
        const sql = "SELECT Email, \
                    FirstName, \
                    LastName, \
                    Password, \
                    PasswordSetup, \
                    IsAdmin \
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
        const sql = "SELECT Email, \
                    FirstName, \
                    LastName, \
                    PasswordSetup, \
                    IsAdmin \
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
        hashPassword(password).then((hashed) => {
            if(hashed === "") {
                reject(new Error("Hashing problem."));
            }
    
            var values = [email, hashed];
    
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
        }).catch((err) => {
            reject(err);
        });
    });
}

function reset_user_password(email) {
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
    get_user_with_password,
    get_all_users,
    update_user,
    update_user_password,
    reset_user_password,
    promote_user_admin,
    delete_user
}
