const express = require("express");
const cors = require("cors");
const fs = require('fs')
const mysql = require("mysql");

const app = express();
var router = express.Router();

app.use(cors());
app.use(express.urlencoded({extended: false}));

try {
    var context = fs.readFileSync('./database/market.json', 'utf8');
    var market = JSON.parse(context);
} catch (e) {
    console.log(e);
    process.exit(1);
}
const marketConn = mysql.createConnection(market);

marketConn.connect();

app.get("/get", (req, res) => {
    marketConn.query("select * from customer", (error, result) => {
        if (error) throw error;
        res.send({
            message: "success",
            status: 200,
            data: result,
        });
        console.log("get success!");
    });
});

app.listen(3001, () => {
    console.log("success in 3001");
});