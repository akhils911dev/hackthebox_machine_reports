const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { decodejwt } = require('../functions/jwt')


router.use('/', async(req,res,next)=>{
    if(req.headers["x-access-token"]){

        const token = decodejwt(req.headers["x-access-token"]);
        if(token){
            const find = await User.findAll({where: {username: token.user, role: token.role}});
            
            if(find.length > 0){

                if(find[0].username == token.user && find[0].role == token.role){

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


router.post('/',(req,res)=>{
    res.json({Status: "Ok", Message: 'This route is under development'});
})



module.exports = router;