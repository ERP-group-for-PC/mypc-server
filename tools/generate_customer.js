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
    var tel = gen.strGen(11, false, false, true, true);
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
        console.log('An error has occurred ', err);
        return;
      }
      console.log('Data written successfully to disk');
});

console.log(customers);
