const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getUserToken = async (token) => {
    const decoded = jwt.verify(token, process.env.SECRET);

    const userId = decoded.id;

    const user = await User.findOne({where: userId});

    return user;
}

module.exports = getUserToken;