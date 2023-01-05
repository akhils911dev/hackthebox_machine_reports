const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { decodejwt } = require('../functions/jwt')

//controllers

const { messages } = require('../controllers/Messages');
const { messages_send } = require('../controllers/Messages_send');

router.use('/', async(req,res,next)=>{
    if(req.headers["x-access-token"]){

        const token = decodejwt(req.headers["x-access-token"]);
        if(token){
            const find = await User.findAll({where: {username: token.user, role: token.role}});
            
            if(find.length > 0){

                if(find[0].username == token.user && find[0].role == token.role && token.role == "admin"){

                    return next();

                }

                return res.json({Status: "Error", Message: "You are not allowed"});
            }

            return res.json({Status: "Error", Message: "You are not allowed"});
        }

        return res.json({Status: "Error", Message: "You are not allowed"});
    }

    return res.json({Status: "Error", Message: "You are not allowed"});
})

router.get('/',(req,res)=>{
    res.json({Status: "Ok", Message: 'Read documentation from api in /documentation'});
})

router.post('/messages',messages);
router.post('/messages/send', messages_send);

module.exports = router;
