const express = require('express');
const multer = require('multer');
const path = require("path");
const router = express.Router();

// dùng multer lưu trữ trên đĩa cứng: diskStorage
const storage = multer.diskStorage({
    // quy ước thư mục mà file lưu trữ vào
    destination: (req, file, cb) => {
        // lỗi: null, địa chỉ lưu trữ: path.join(__dirname, "../assets")
        // console.log(path.join(__dirname, "../assets"));
        cb(null, path.join(__dirname, "../assets"));
    }, 
    // tạo filename độc nhất để tránh bị trùng lặp
    filename: (req, file, cb) => {
        // thêm hậu tố vào tên file
        const suffix = Date.now() + '-' + Math.round(Math.random() * 100);
        // console.log(file);
        const fileName = file.fieldname + "-" + suffix + "-" + file.originalname;
        req.uploadedFile = "http://localhost:5001/assets/" + fileName;
        cb(null, fileName);
    },
});

const uploadMdw = multer({storage: storage});

// myFile chính là fieldname - tên trường dữ liệu ở trên
router.post('/', uploadMdw.single("myFile"), (req, res) => {
    res.send(req.uploadedFile);
});

module.exports = router;