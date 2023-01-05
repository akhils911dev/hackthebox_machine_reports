const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { signtoken } = require('../functions/jwt')
const { exec } = require('child_process');

router.post('/register', async (req,res)=>{
    if(req.body.username != null && req.body.password != null){
        try{
            const find = await User.findAll({where: {username: req.body.username}})
            if(find.length == 0){

                User.create({
                    username: req.body.username,
                    password: req.body.password,
                    role: "user"
                });

                exec('/home/victor/pollution_api/log.sh log_register');

                return res.json({Status: "Ok"});

            }

            return res.json({Status: "This user already exists"});
        }catch(err){

            return res.json({Status: "Error"});

        }
    }

    return res.json({Status: "Parameters not found"});
})

router.post('/login', async (req,res)=>{
    if(req.body.username != null && req.body.password != null){
        try{
            const find = await User.findAll({where: {username: req.body.username, password: req.body.password}});
            if(find.length > 0){

                exec('/home/victor/pollution_api/log.sh log_login');

                const token = signtoken({user: find[0].username, is_auth: true, role: find[0].role});
                return res.json({
                    Status: "Ok",
                    Header: {
                        "x-access-token": token
                    }
                });

            }

            return res.json({Status: "Error", Message: "Invalid Credentials"});
        }catch(err){

            return res.json({Status: "Error"});

        }

    }

    return res.json({Status: "Parameters not found"});
})


module.exports = router;
