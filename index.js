const express = require("express");
const cors = require("cors");
const market = require("./database/market")
const mysql = require("mysql");

const app = express();
var router = express.Router();

app.use(cors());
app.use(express.urlencoded({extended: false}));

const marketConn = mysql.createConnection(market.market);

marketConn.connect();

app.get("/get", (req, res) => {
    marketConn.query("select * from user", (error, result) => {
        if (error) throw error;
        res.send({
            message: "success",
            status: 200,
            data: result,
        });
    });
});

app.listen(3001, () => {
    console.log("success in 3001");
});