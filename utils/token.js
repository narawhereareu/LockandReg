const jwt = require('jsonwebtoken');

const getToken = (payload) =>{
    const secretKey = process.env.JWT_KEY;
    const option = {expiresIn: '30d'}
    const token = jwt.sign(payload,secretKey,option)

    return `Mykey ${token}`;
};

module.exports = {getToken};

