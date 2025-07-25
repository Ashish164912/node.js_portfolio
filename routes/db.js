const express = require('express');
const mysql = require('mysql');
const util = require('util');

const conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "project_portfolio_data"
});



const execute = util.promisify(conn.query).bind(conn);

module.exports = execute;