require('dotenv').config();

const { Pool } = require('pg');

// Pool configuration for database requests
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;
const db = new Pool({
    user:PGUSER,
    host: PGHOST,
    database:PGDATABASE,
    password:PGPASSWORD,
    port:PGPORT,
    ssl:false
});

/**
 * @returns {Promise<string>} version of the postgre database
 */
async function getPgVersion() {
    return new Promise((resolve, reject) => {
        db.query('select version()', [], (err, result) => {
            if (err) {
                reject('Error executing query:\n' + err.stack);
            } else {
                resolve(result.rows[0].version);
            }
        });
    });
}

module.exports = { db, getPgVersion };