const express = require('express');
const {connectToDb} = require('./database');
const router = require('./routers') // mặc định sẽ tìm đến file index.js

const app = express();

// middleware này giúp xử lý dữ liệu ko thuộc dạng json
// app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(router);
// lưu trữ ảnh vào folder assets, truy cập đường link http://.../assets/ để truy cập đc ảnh này
app.use('/assets', express.static('assets'));

connectToDb();

app.listen('5001', () => {
    console.log("app is listening on port 5001");
})