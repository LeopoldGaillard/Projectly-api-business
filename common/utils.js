const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
require('dotenv').config();

/**
 * Password hash
 * @param {string} password password to hash
 * @returns {Promise<string>} hashed password if successful, else returns ""
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

/**
 * @returns {string} current date and time in the format "YYYY-MM-DD HH:MM:SS"
 */
const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}

/**
 * Function to send an email
 * @param {{string}} to Target of the email
 * @param {{string}} subject Subject of the email
 * @param {{string}} text Content of the email
 */
const sendMail = async({to, subject, text}) =>{
    try {
        let mailOptions = ({
            from: "Projectly <no-reply@projectly.com>",
            replyTo: "no-reply@projectly.com",
            to,
            subject,
            text
        });
        
        const Transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SENDEREMAIL,
                pass: process.env.SENDERPASSWORD,
            },
        });
        
        return await Transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    hashPassword,
    giveCurrentDateTime,
    sendMail
}
