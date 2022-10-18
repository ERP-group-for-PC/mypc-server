#!/usr/bin/env node
const { Command, Argument } = require("commander");
const util = require('util');
const program = new Command();
const chalk = require("chalk");
const mysql = require('mysql');

var columns = [];
var record = [];

// 
// program
//     .command('column <name> [otherNames...]')
//     .description('The columns of the table you use')
//     .action((name, otherNames) => {
//         record.push(name);
//         if (otherNames) {
//             otherData.forEach(element => {
//                 columns.push(element);
//             });
//         }
//     });

// program
//     .command('data <data> [otherData...]')
//     .description('The data you want to insert')
//     .action((data, otherData) => {
//         record.push(data);
//         if (otherData) {
//             otherData.forEach(element => {
//                 record.push(element);
//             });
//         }
//     });

program
    .version('0.0.1')
    .option('-d, --database <name>', "The database you want to use, you should initiate a config file named <database>.json in '../database/'")
    .option('-t, --table <name>', "The table you want to use")
    .option('-f, --file <name>', "The file where data are saved, those files should be placed in '../data/'");

program.parse(process.argv);

const options = program.opts();
const config = (argv, option) => {
    try {
        if (!option) {
            throw `No ${chalk.red(argv)} Assigned! Please check and enter again!`;
        }
        else {
            console.log(`--${argv}: ${chalk.blue(option)}`);
        }
    } catch(e) {
        console.log(e);
        process.exit(1);
    }
}

config('Database', options.database);
config('Table', options.table);
config('File', options.file);
const fs = require('fs');

if (options.file) {
    try {
        const file = fs.readFileSync(`../data/${options.file}`, 'utf8');
    
        // parse JSON string to JSON object
        const text = JSON.parse(file);
        console.log(text);

        record = text.data;
    
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
}

var mod;
try {
    const file = fs.readFileSync(`../database/${options.database}.json`, 'utf8');

    // parse JSON string to JSON object
    mod = JSON.parse(file);

} catch (err) {
    console.log(`Error reading file from disk: ${err}`);
}
console.log(`--Imported module: ${chalk.blue(options.database)}`);

var connection = mysql.createConnection(mod);
console.log(mod);

const sql = `INSERT INTO ${options.table} SET ?`;

for (var i = 0; i < record.length; ++i) {
    connection.query(sql, record[i], function (err, rows, fields) {
        if(err){
            console.log('INSERT ERROR - ', err.message);
            return;
        }
        console.log("INSERT SUCCESS");
    });
}
