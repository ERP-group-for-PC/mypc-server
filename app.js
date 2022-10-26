const express = require("express");
const cors = require("cors");
const fs = require('fs')
const mysql = require("mysql");
const api = require('./api')
const connect = require('./database')

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
api(app)

// var connetion = connect('market');

// app.get("/get", (req, res) => {
//     connetion.query("select * from customer", (error, result) => {
//         if (error) throw error;
//         res.send({
//             message: "success",
//             status: 200,
//             data: result,
//         });
//         console.log("get success!");
//     });
// });

app.get('/api', (req, res) => {
    console.log("hello world");
    res.send('Hello World');
});

app.get('/api/login', (req, res) => {
    res.send('Login');
});

app.post('/api', (req, res) => {
    console.log('收到请求体:', req.body); // 打印请求体
    res.status(201).send(); // 使用res.status设置响应状态码,201代表资源创建成功,再调用send发送响应
});

app.post('/api/register', (req, res) => {

})

// :id表示该url后的值会作为请求的参数,并赋给id变量
app.put('/api/:id', (req, res) => {
    console.log('收到请求参数,id为:', req.params.id);
    console.log('收到请求体:', req.body);
    res.send(); // 响应,默认状态码为200
});

app.delete('/api/:id', (req, res) => {
    console.log('收到请求参数,id为:', req.params.id);
    res.status(204).send(); // 204代表资源删除成功
})

// app.get("/api/customer/delete", (req, res) => {
//     marketConn.query("delete from customer where * ", (error, result) => {
//         if (error) throw error;
//         res.send({

//         })
//     })
// })

app.listen(3001, () => {
    console.log("success in 3001");
});