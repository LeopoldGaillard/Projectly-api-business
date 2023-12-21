require('dotenv').config()

const { Pool } = require('pg')

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

async function getPgVersion() {
    return new Promise((resolve, reject) => {
        db.query('select version()', [], (err, result) => {
            if (err) {
                reject('Error executing query:\n' + err.stack);
            } else {
                resolve(result.rows[0].version);
            }
        })
    });
}

module.exports = { db, getPgVersion }