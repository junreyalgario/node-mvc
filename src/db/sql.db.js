const Pool = require('pg').Pool;
const config = require('../config/db.config')

exports.pgsql = new Pool({
    host: config.pgsql.HOST,
    user: config.pgsql.USER,
    password: config.pgsql.PASSWORD,
    database: config.pgsql.DB
});