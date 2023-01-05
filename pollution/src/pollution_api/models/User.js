const db = require('./db');

const User = db.sequelize.define('users',{
    id: {
        type: db.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: db.Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
})

User.sync();
module.exports = User;