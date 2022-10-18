const firstNames = [
    'Bao', 'Cao', 'Fu', 
    'Gao', 'Li', 'Liu',
    'Ma', 'Mei', 'Mu', 
    'Xie', 'Wang', 'Zhang',
    'Zheng', 'Lai', 'Yu'
];

const lastNames = [
    'Anna', 'Andrew', 'Angel',
    'Bob', 'Bruno', 'Bill',
    'Cristiano', 'Edward', 'Edsen',
    'John', 'Jonny', 'Miller'
];

const cities = [
    'Beijing',
    'Shanghai',
    'Guangzhou',
    'Shenzhen',
    'Tokyo',
    'London',
    'New York'
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

function strGen(len, upper=false, special=false, onlyNum=false) {
    var count = 0;
    var str = '';
    while (count < len) {
        var letter = '';
        if (onlyNum) {
            letter = Math.floor(Math.random() * 9).toString();
        }
        else if (Math.random() * 5 > 2) {
            if (upper === true && Math.random() * 5 > 1) {
                letter = Math.floor(Math.random() * 26) + 'A';
            }
            letter = Math.floor(Math.random() * 26) + 'a';
        }
        else {
            if (special === true) {
                letter = Math.floor(Math.random() * 30) + '|';
            }
        }
        str += letter;
        count++;
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