const mysql = require('mysql');
var config = require('./config.json');
const connection = mysql.createConnection({
    host: config.host,
    port: config.port,
    database: config.database,
    user: config.user,
    password: config.password
});

connection.connect(function (err) {
    if(err)
    {
        throw err;
    }
    else
    {
        console.log("connection created with Mysql successfully");
    }
});

module.exports.connection = connection;

