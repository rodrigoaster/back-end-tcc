const jwt = require('jsonwebtoken');

const createUserToken = async (user, req, res) => {
    const token = jwt.sign({
        name: user.user_Name,
        id: user.user_Id
    }, process.env.SECRET);

    res.status(200).json({ 
        message: "Usuário autenticado com sucesso!",
        token: token,
        userName: user.user_Name
    })
}

module.exports = createUserToken;