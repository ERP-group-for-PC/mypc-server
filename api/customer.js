const express = require('express')
const connect = require('../database')
const router = express.Router()

var connection = connect('market')

router.get('/get', (req, res) => {
    connection.query("select * from customer", (error, result) => {
        if (error) throw error;
        res.send({
            message: "success",
            status: 200,
            data: result,
        });
        console.log("get success!"); 
        console.log("get: %s", result);
    });
});

router.get('/get/add', (req, res) => {
    connection.query(`insert into customer set ?`, req.query, (error, result) => {
        if (error) {
            console.log(error);
            throw error;
        }
        res.send({
            message: "insert success",
            status: 201,
        });
        console.log(req.query);
    });
});

router.get('/get/history', (req, res) => {
    connection.query(`select Customer_Code='${req.query.account}' from Order_Table`, (error, result) => {
        if (error) throw error;
        res.send({
            message: "success",
            status: 200,
            data: result,
        });
    });
});

router.post('/post', (req, res) => {
    // connection.query(`insert into customer set ?`, req.body, (error, result) => {
    //     if (error) throw error;
    //     res.send({
    //         message: "insert success",
    //         status: 201,
    //     })
    // });
    console.log('保存商品', req.body);
    res.status(201).send({id: 2, ...req.body});
});

router.put('/put', (req, res) => {
    console.log('收到请求参数, 商品id为:', req.params.id);
    console.log('收到请求体, 新的商品内容为:', req.body);
    res.send({id: req.params.id, ...req.body});
});

router.delete('/delete', (req, res) => {
    connection.query(`delete from customer where account='${req.query.account}'`, (error, result) => {
        if (error) throw error;
        res.send({
            message: "success",
            status: 204,
        });
        console.log("delete success!"); 
    });
    console.log('收到请求参数, account为: ', req.query.account);
});

module.exports = router;