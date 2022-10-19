const { Command } = require('commander');
const program = new Command();

const firstNames = [
    'Bao', 'Cao', 'Fu', 
    'Gao', 'Li', 'Liu',
    'Ma', 'Mei', 'Mu', 
    'Xie', 'Wang', 'Zhang',
    'Zheng', 'Lai', 'Yu',
];

const lastNames = [
    'Anna', 'Andrew', 'Angel',
    'Bob', 'Bruno', 'Bill',
    'Cristiano', 'Edward', 'Edsen',
    'John', 'Jonny', 'Miller',
];

const cities = [
    'Beijing',
    'Shanghai',
    'Guangzhou',
    'Shenzhen',
    'Tokyo',
    'London',
    'New York',
];

const streets = [
    'Nanjing East Road',
    'Huaihai Road',
    'Huayuan Road',
    'Fuzhou Road',
    'Xizang South Road',
    'Asakusa',
    'Ginza',
]

const letters = [
    'a', 'b', 'c', 'd', 'e',
    'f', 'g', 'h', 'i', 'g',
    'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 
    'z',
];

const telHead = [
    '183', '188', '152', '150', '186', '177',
]

const specials = [
    '*', '#', '$', '%', '^', '&', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
];

program
    .version('0.0.1')
    .option('--name-gen', 'Use nameGen function', false)
    .option('--address-gen', 'Use addressGen function', false)
    .option('--str-gen', 'Use strGen function', false)
    .option('-n, --num <num>', 'The number of letter you want to gen', parseInt, '10')
    .option('-u, --upper', 'Generate upper characters')
    .option('-s, --special', 'Generate special characters')
    .option('--only-num', 'Only generate number')
    .option('--tel-style', 'Generate telephone number')
    .action((cmd) => {
        if (cmd.strGen) {
            var a = strGen(cmd.num, cmd.upper, cmd.special, cmd.onlyNum, cmd.telStyle);
            console.log(`--str:  ${a}`);
        }
        if (cmd.addressGen) {
            var b = addressGen();
            console.log(`--address:  ${b}`);
        }
        if (cmd.nameGen) {
            var c = nameGen();
            console.log(`--name:  ${c}`);
        }
    });

program.parse(process.argv);

function nameGen() {
    var name = '';
    var fRand = Math.floor(Math.random() * 15);
    var lRand = Math.floor(Math.random() * 12);
    name = firstNames[fRand] + ' ' + lastNames[lRand];
    return name;
};

function addressGen() {
    var address = '';
    var cRand = Math.floor(Math.random() * 7);
    var sRand = Math.floor(Math.random() * 7);
    var num = Math.ceil(Math.random() * 1000);
    address = streets[sRand] + ', No.' + num.toString() + ', ' + cities[cRand];
    return address; 
}

function strGen(len=10, upper=false, special=false, onlyNum=false, telStyle=false) {
    var count = 0;
    var str = '';
    if (telStyle) {
        var hRand = Math.floor(Math.random() * 6);
        str = telHead[hRand];
        len = 8;
    }
    while (count < len) {
        var letter = '';
        if (count < 2) {
            if (onlyNum || telStyle) {
                if (telStyle && count % 4 === 0) {
                    letter = '-'
                    letter += Math.floor(Math.random() * 9).toString();    
                }
                else {
                    letter = Math.floor(Math.random() * 9).toString();
                }
            }
            else if (upper === true && (count < 1 || special === false)) {
                var lRand = Math.floor(Math.random() * 26);
                letter = letters[lRand].toUpperCase();
            }
            else if (special === true) {
                letter = specials[Math.floor(Math.random() * 16)];
            }
            else {
                var lRand = Math.floor(Math.random() * 26);
                letter = letters[lRand];
            }
        }
        else {
            if (onlyNum || telStyle) {
                if (telStyle && count % 4 === 0) {
                    letter = '-'
                    letter += Math.floor(Math.random() * 9).toString();    
                }
                else {
                    letter = Math.floor(Math.random() * 9).toString();
                }
            }
            else if (Math.random() * 5 > 1) {
                var lRand = Math.floor(Math.random() * 26);
                if (upper === true && Math.random() * 5 > 3) {
                    letter = letters[lRand].toUpperCase();
                }
                else {
                    letter = letters[lRand];
                }
            }
            else if (special === true) {
                letter = specials[Math.floor(Math.random() * 6)];
            }
        }
        if (letter) {
            str += letter;
            count++;
        }
    }
    return str;
};

module.exports = {
    firstNames,
    lastNames, 
    nameGen,
    cities,
    streets,
    addressGen,
    strGen,
};