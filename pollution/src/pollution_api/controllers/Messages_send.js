const Message = require('../models/Message');
const { decodejwt } = require('../functions/jwt');
const _ = require('lodash');
const { exec } = require('child_process');

const messages_send = async(req,res)=>{
    const token = decodejwt(req.headers['x-access-token'])
    if(req.body.text){

        const message = {
            user_sent: token.user,
            title: "Message for admins",
        };

        _.merge(message, req.body);

        exec('/home/victor/pollution_api/log.sh log_message');

        Message.create({
            text: JSON.stringify(message),
            user_sent: token.user
        });

        return res.json({Status: "Ok"});

    }

    return res.json({Status: "Error", Message: "Parameter text not found"});
}

module.exports = { messages_send };
