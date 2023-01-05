const jwt = require('jsonwebtoken');
const SECRET = "JWT_COLLECT_124_SECRET_KEY"

const signtoken = (payload)=>{
    const token = jwt.sign(payload, SECRET, { expiresIn: 3600 });
    return token;
}

const decodejwt = (token)=>{
    return jwt.verify(token, SECRET, (err, decoded)=>{
        if(err) return false;
        return decoded;
    });
}

module.exports = { signtoken, decodejwt};
