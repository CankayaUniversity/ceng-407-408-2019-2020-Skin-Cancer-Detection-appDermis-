const {User} = require("../models/User");
const jwt = require('jsonwebtoken');
module.exports = function (req, res, next) {
    //Headerdan tokenı çekeriz
    const token = req.header('x-auth-token');
    //token var mı diye kontrol
    if (!token) {
        return res.status(401).json({msg: 'No token, authorization denied'});
    }
    //tokenı doğrularız
    try {
        const decoded = jwt.verify(token, "mysecretjwttoken");
        //Her yerde artık req.user kullanılabilir.
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg: 'Token is not valid.'});
    }
}

