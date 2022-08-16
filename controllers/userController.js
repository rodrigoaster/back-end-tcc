const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = require('../helpers/createUserToken');
const getToken = require('../helpers/getToken');
const getUserByToken = require('../helpers/getUserByToken');

module.exports = class userController {
    //create user

    static async createUser(req, res) {
        const { user_Name, user_CPF, user_Email, user_Password, user_ConfirmPassword } = req.body;


        
        if(!user_Name) {
            res.status(422).json({ message: "O nome é obrigatório!"})
            return
        }
        if(!user_CPF) {
            res.status(422).json({ message: "O CPF é obrigatório!"})
            return
        }

        const cpfCheck = await User.findOne({where:{ user_CPF:user_CPF } });
            if(cpfCheck) {
                res.status(422).json({ message: "CPF já cadastrado! Por favor, verifique seus dados novamente."})
                return
            }

        if(!user_Email) {
            res.status(422).json({ message: "O email é obrigatório!"})
            return
        }
        if(!user_Password) {
            res.status(422).json({ message: "A senha é obrigatória!"})
            return
        }
        if(!user_ConfirmPassword) {
            res.status(422).json({ message: "Confirmação de senha é obrigatória!"})
            return
        }
        if (user_Password !== user_ConfirmPassword) {
            res.status(422).json({ message: "A senha precisa ser igual a confirmação de senha!" })
            return
        }

        const emailCheck = await User.findOne({where:{ user_Email:user_Email } });
            if(emailCheck) {
                res.status(422).json({ message: "Email já cadastrado! Por favor, verifique seus dados novamente."})
                return
            }


        const salt = await bcrypt.genSalt(12) // uma string a mais no password do user
        const encryptPass = await bcrypt.hash(user_Password, parseInt(salt));
        console.log(user_Name, user_CPF, user_Email, user_Password); 


        try {
            await User.create({user_Name, user_CPF, user_Email, user_Password: encryptPass}); 

            res.status(200).json({ message: "Cadastro realizado com sucesso!" })  
        } catch (err) {
            res.status(422).json({ message: "Não foi possível criar o usuário, por favor, tente mais tarde.", error: err })
            return
        }
        
               
    }

    //check login

    static async loginUser(req, res) {
        const { user_Email, user_Password } = req.body;

        if(!user_Email) {
            res.status(422).json({ message: "O email é obrigatório!"})
            return
        }
        
        if(!user_Password) {
            res.status(422).json({ message: "A senha é obrigatória!"})
            return
        }

        const user = await User.findOne({where:{ user_Email:user_Email }});

        if(!user) {
            res.status(422).json({ message: "Email ou senha inválida, tente novamente."})
            return
        }

        const validatePassword = await bcrypt.compare(user_Password, user.user_Password);

        if(!validatePassword) {
            res.status(422).json({ message: "Email ou senha inválida, tente novamente." })
            return
        }

        await createToken(user, req, res);

    }
    
    //check user
    
    static async checkUser(req, res) {
        let currentUser
        
        if(req.headers.authorization) {
            
            const token = getToken(req);
            const decoded = jwt.verify(token, process.env.SECRET);

            currentUser = await User.findByPk(decoded.id);

            currentUser.user_Password = undefined;

        }else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    //check userId

    static async checkUserId(req, res) {
        const { user_Id } = req.params;

        const user = await User.findByPk(user_Id);

        if(!user) {
            res.status(422).json({message: "Usuário não encontrado"});
            return
        }    

        user.user_Password = undefined;
    
        res.status(200).json({ user })
    }

    //update user

    static async updateUser(req, res) {
        const { user_Id } = req.params;
        const { user_Name, user_CPF, user_Email, user_Password, user_ConfirmPassword } = req.body;
        
        const token = getToken(req)
        const user = await getUserByToken(token);  


        if(!user_Name) {
            res.status(422).json({ message: "O nome é obrigatório!"})
            
            return
        }

        user.userName = user_Name
        
        if(!user_CPF) {
            res.status(422).json({ message: "O CPF é obrigatório!"})

            return
        }

        user.user_CPF = user_CPF

        if(!user_Email) {
            res.status(422).json({ message: "O email é obrigatório!"})

            return
        }

        const userCheck = await User.findOne({where: {user_Email: user_Email}});

        if(user.user_Email !== user_Email && userCheck) {
            res.status(422).json({message: "Email já cadastrado, por favor, tente outro email."});
            
            return
        }

        user.user_Email = user_Email;


        if (user_Password !== user_ConfirmPassword) {
            res.status(422).json({ message: "A senha precisa ser igual a confirmação de senha!" })

            return
        } else if (user_Password === user_ConfirmPassword && user_Password != null) {
            const salt = await bcrypt.genSalt(12) 
            const encryptPass = await bcrypt.hash(user_Password, parseInt(salt));

            user.user_Password = encryptPass;
        }

        try {
            
            const datasUser = {
                user_Id,
                user_Name,
                user_CPF,
                user_Email,
                user_Password
            }

            await User.update(datasUser, {where: {user_Id: user_Id}});

            res.status(200).json({ message: "Usuário atualizado com sucesso!" })

        } catch (err) {
            res.status(500).json({ message: "Ocorreu um erro ao atualizar, tente novamente." + err })
            return
        }

    }

    static async deleteUser(req, res) {
        const { user_Id } = req.params;
        const { user_Email, user_Password } = req.body;


        const token = getToken(req)
        const user = await getUserByToken(token);  

        
        if(!user_Email) {
            res.status(422).json({ message: "O email é obrigatório!"})
            return
        }
        
        if(!user_Password) {
            res.status(422).json({ message: "A senha é obrigatória!"})
            return
        }

        await User.findOne({where:{ user_Email:user_Email }});

        if(!user) {
            res.status(422).json({ message: "Não foi encontrado usuário com este email!"})
            return
        }

        const validatePassword = await bcrypt.compare(user_Password, user.user_Password);

        if(!validatePassword) {
            res.status(422).json({ message: "Senha inválida, tente novamente." })
            return
        }

        await user.destroy({where: {user_Id: user_Id}})
    
        res.status(200).json({message: 'Usuário deletado com sucesso!'});
     }
}
