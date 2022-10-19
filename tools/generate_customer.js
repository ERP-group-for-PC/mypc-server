const gen = require('./generator')
const { Command } = require('commander')
const program = new Command();
const fs = require('fs');

program
    .version('0.0.1')
    .option('-n, --num <n>', "Total num of data you want to gen", parseInt, 10)
    .parse(process.argv);

var customers = {data: []};
const options = program.opts();
console.log(options.num);

for (var i = 0; i < options.num; ++i) {
    var account = gen.nameGen();
    var tel = '193-4324-4342';
    var email = 'mkmk232142@qq.com';
    var level = Math.random();
    var record = {
        account: account,
        tel: tel,
        email: email,
        level: level,
    };
    customers.data.push(record);
}

let str = JSON.stringify(customers, null, '\t');

fs.writeFile('../data/customer.json', str, (err) => {
    if (err) {
        res
            .status(500)
            .send('Server is error...');
    }
});

console.log(customers);
