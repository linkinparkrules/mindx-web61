const jwt = require('jsonwebtoken');
const {findById} = require('../database/user');

const authMdw = (req,res,next) => {
    const {authorization} = req.headers;
    if (!authorization) {
        res.status(401).send("missing JWT token");
    }
    jwt.verify(authorization, "thisisprivatekey", async (err, decodedInfo) => {
        if (err) {
            res.status(401).send(err.message);
        } else {
            console.log(decodedInfo);
            const user = await findById(decodedInfo.userId);
            req.user = user; // mục đích viết câu lệnh này là để sử dụng req.user cho những đoạn code sau (kể cả ở file khác), vd như check xem req.user.isAdmin có đúng ko chẳng hạn
            // console.log(req.user);
            next();
        }
    })
};

const requireAdmin = (req,res,next) => {
    if (!req.user || !req.user.isAdmin) {
        res.status(403).send("Permission denied");
    } else {
        next();
    }
}

module.exports = {authMdw, requireAdmin};