require('dotenv').config();

module.exports = {
    secret: process.env.AUTH_SECRET,
    secret2: process.env.MAILER_SECRET
};