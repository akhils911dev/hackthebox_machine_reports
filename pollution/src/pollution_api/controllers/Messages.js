const Message = require('../models/Message');

const messages = async(req,res)=>{
    if(req.body.id){
        const find = await Message.findAll({where: {id: req.body.id}});
        const message = find.map((message)=>{
            return {
                ID: message.id,
                Message: JSON.parse(message.text)
            };
        })
        return res.json(message);
    }

    const find = await Message.findAll({ raw: true });
    const message = find.map((message)=>{
        return {
            ID: message.id,
            Message: JSON.parse(message.text)
        };
    })
    return res.json(message);
    
}

module.exports = { messages };