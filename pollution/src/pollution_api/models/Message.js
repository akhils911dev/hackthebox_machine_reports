const db = require('./db');

const Message = db.sequelize.define('messages',{
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    text: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    user_sent: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
})

Message.sync();
module.exports = Message;