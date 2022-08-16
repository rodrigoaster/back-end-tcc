const jwt = require('jsonwebtoken');
const User = require('../models/User');

const getUserToken = async (token) => {
    if(!token) {
        res.status(401).json({ message: "Acesso negado!" })
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    const userId = decoded.userId;

    const user = await User.findOne({where: userId});

    return user;
}

module.exports = getUserToken;