const express = require('express')
const router = express.Router()

router.get('/get', (req, res) => {
    res.send({id: 1, title: '香辣鸡翅'});
});

router.post('/post', (req, res) => {
    console.log('保存商品', req.body);
    res.status(201).send({id: 2, ...req.body});
});

router.put('/put/:id', (req, res) => {
    console.log('收到请求参数, 商品id为:', req.params.id);
    console.log('收到请求体, 新的商品内容为:', req.body);
    res.send({id: req.params.id, ...req.body});
});

router.delete('/delete/:id', (req, res) => {
    console.log('收到请求参数, 商品id为:', req.params.id);
    res.status(204).send();
});