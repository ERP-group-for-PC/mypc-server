const fs = require('fs')
const mysql = require('mysql')

module.exports = (database) => {
    try {
        var context = fs.readFileSync(`./database/${database}.json`, 'utf8');
        var config = JSON.parse(context);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
    const connection = mysql.createConnection(config);
    
    connection.connect();
} 