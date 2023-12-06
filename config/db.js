require('dotenv').config()

const { Pool } = require('pg')

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;
const db = new Pool({
    user:PGUSER,
    host: PGHOST,
    database:PGDATABASE,
    password:PGPASSWORD,
    port:PGPORT,
    ssl:false
})

async function getPgVersion() {
    db.query('select version()', [], (err, result) => {
        if (err) {
            return console.error('Error executing query', err.stack)
        }
        console.log("Database version: " + result.rows[0].version);
    })
}

getPgVersion();

module.exports = db