#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
const shell = require("shelljs");
const fs = require('fs');
const gen = require('./generator')

const init = () => {
    console.log(
        chalk.green(
            figlet.textSync("Data Generator", {
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        )
    );
};

const rateGen = () => {
    return Math.random();
}

const numGen = () => {
    return Math.floor(Math.random() * 500);
}

const askQuestions = async () => {
    // table names & foreign keys
    var name;
    var num;
    var data = [];
    const tableName = [
        {
            name: "tableName",
            type: "input",
            message: "What is the name of the table you want to create?",
        },
        {
            name: "dataNum",
            type: "input",
            message: "The total number of data in this table: ",
            default: 12,
        },
    ];
    const askForeignKey = [
        {
            name: "foreign",
            type: "confirm",
            message: "The foreign keys: ",
            default: false,
        },
    ];
    const foreignKey = [
        {
            name: "path",
            type: "input",
            message: "Where are the foreign keys?",
        },
        {
            name: "key",
            type: "input",
            message: "Foreign keys?",
        },
    ]
    const firstColumn = [
        {
            name: "col",
            type: "input",
            message: "Column Name: ",
        },
        {
            name: "value",
            type: "list",
            message: "How to generate a value: ",
            choices: ['random', 'input'],
        },
    ]
    const askColumn = [
        {
            name: "col",
            type: "confirm",
            message: "Another columns?",
            default: true,
        },
    ];
    const newColumn = [
        {
            name: "key",
            type: "input",
            message: "Column Name: ",
        },
        {
            name: "value",
            type: "list",
            message: "How to generate a value: ",
            choices: ['random', 'input'],
        },
    ];
    const inputValue = [
        {
            name: "value",
            type: "input",
            message: "Please input the value (notice: all data of this column will have the same value): ",
        },
    ]
    const genValue = [
        {
            name: "value",
            type: "rawlist",
            message: "Please chose which type of value you want to generate: ",
            choices: ['name', 'address', 'rate', 'tel', 'email', 'num'],
        },
    ]
    await inquirer.prompt(tableName)
                .then((answer) => {
                    name = answer.tableName;
                    num = answer.dataNum;
                });
    var end = false;
    while (!end) {
        await inquirer.prompt(askForeignKey)
            .then(async (answer) => {
                if (answer.foreign === true) {
                    await inquirer.prompt(foreignKey)
                        .then((answer) => {
                            var context;
                            try {
                                context = fs.readFileSync(`../data/${answer.path}.json`, 'utf8');
                            } catch (e) {
                                console.log(e);
                                process.exit(1);
                            }
                            const records = JSON.parse(context);
                            let f_num = records.data.length;
                            num = num === f_num ? num : f_num;
                            for (var i = 0; i < num; ++i) {
                                if (data.length < num) {
                                    var datum = {};
                                    datum[answer.key] = records.data[i][answer.key];
                                    data.push(datum);
                                }
                                else {
                                    data[i][answer.key] = records.data[i][answer.key];
                                }
                            }
                        })
                }
                else {
                    end = true;
                }
            })
    }
    end = false;

    if (data.length === 0) {
        await inquirer.prompt(firstColumn)
            .then(async (answer) => {
                var col = answer.col;
                if (answer.value === 'input') {
                    await inquirer.prompt(inputValue)
                        .then((answer) => {
                            for (var i = 0; i < num; ++i) {
                                var datum = {};
                                datum[col] = answer.value;
                                data.push(datum);
                            }
                        })
                }
                else {
                    await inquirer.prompt(genValue)
                        .then((answer) => {
                            for (var i = 0; i < num; ++i) {
                                var datum = {};
                                var value;
                                switch (answer.value) {
                                    case 'name':
                                        value = gen.nameGen();
                                        break;
                                    case 'address':
                                        value = gen.addressGen();
                                        break;
                                    case 'rate':
                                        value = rateGen();
                                        break;
                                    case 'tel':
                                        value = gen.strGen(11, false, false, true, true);
                                        break;
                                    case 'email':
                                        value = gen.strGen(10, true, true, false, false);
                                        value += '@qq.com';
                                        break;
                                    case 'num':
                                        value = numGen();
                                        break;
                                    default:
                                        break;
                                }
                                datum[col] = value;
                                data.push(datum);
                            }
                        })
                }
            })
    }
    while (!end) {
        await inquirer.prompt(askColumn)
            .then(async (answer) => {
                if (answer.col === false) {
                    end = true;
                }
                else {
                    await inquirer.prompt(newColumn)
                        .then(async (answer) => {
                            var col = answer.key;
                            if (answer.value === 'input') {
                                await inquirer.prompt(inputValue)
                                    .then((answer) => {
                                        for (var i = 0; i < num; ++i) {
                                            data[i][col] = answer.value;
                                        }
                                    })
                            }
                            else {
                                await inquirer.prompt(genValue)
                                    .then((answer) => {
                                        for (var i = 0; i < num; ++i) {
                                            var value;
                                            switch (answer.value) {
                                                case 'name':
                                                    value = gen.nameGen();
                                                    break;
                                                case 'address':
                                                    value = gen.addressGen();
                                                    break;
                                                case 'rate':
                                                    value = rateGen();
                                                    break;
                                                case 'tel':
                                                    value = gen.strGen(11, false, false, true, true);
                                                    break;
                                                case 'email':
                                                    value = gen.strGen(10, true, true, false, false);
                                                    value += '@qq.com';
                                                    break;
                                                case 'num':
                                                    value = numGen();
                                                    break;
                                                default:
                                                    break;
                                            }
                                            data[i][col] = value;
                                        }
                                    })
                            }
                        })
                }
            })
    }

    return {
        data: data,
        file: name,
    };
};

const createFile = (filename) => {
    const filePath = `../data/${filename}.json`
    shell.touch(filePath);
    return filePath;
};

const success = (filepath) => {
    console.log(
        chalk.white.bgGreen.bold(`Done! File created at ${filepath}`)
    );
};

const run = async () => {
    // show script introduction
    init();
    // ask questions
    const answers = await askQuestions();
    const data = { data: answers.data};
    const fileName = answers.file;
    console.log(fileName);
    // create the file
    const filePath = createFile(fileName);
    // show success message
    success(filePath);
    const records = JSON.stringify(data, null, '\t');
    fs.writeFile(filePath, records, (err) => {
        if (err) {
            console.log(chalk.red(err));
        }
        console.log(chalk.blue('Success write data!'))
    })
};

run();