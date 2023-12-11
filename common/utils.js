const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
require('dotenv').config()

/**
 * Function that reduces a json with one of its columns
 * @param {JSON} json json we want to reduce
 * @param {number} column key column to reduce
 * @returns reduced json
 */
function reduceJson(json, column) {
    const jsonReduced = json.reduce((acc, content) => {
        const line = content[column];
        if (!acc[line]) {
            acc[line] = [];
        }
        acc[line].push(content);
        return acc;
    }, {});
    return jsonReduced
}

/**
 * Password hash
 * @param {string} password password to hash
 * @returns hashed password if successful, else returns ""
 */
function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
        .then(hash => {
            resolve(hash);
        })
        .catch(err => reject(err));
    });
}

const sendMail = async({to, subject, text}) =>{
    try {
        let mailOptions = ({
            from: "Projectly <no-reply@projectly.com>",
            replyTo: "no-reply@projectly.com",
            to,
            subject,
            text
        })
        
        const Transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SENDEREMAIL,
                pass: process.env.SENDERPASSWORD,
            },
        });
        
        return await Transporter.sendMail(mailOptions) 
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    reduceJson,
    hashPassword,
    sendMail
}
