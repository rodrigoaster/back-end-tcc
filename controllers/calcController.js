const Calc = require('../models/Calc');
const getToken = require('../helpers/getToken');
const getUserByToken = require('../helpers/getUserByToken');

module.exports = class calcController {
    
    static async createCalc(req, res) {
        const { tbUserUserId } = req.params
        const { calc_Eletro, calc_Potencia, calc_QuantEletro, calc_QuantHours, calc_QuantDays, calc_Consumo, calc_Gasto } = req.body;

        const token = getToken(req)
        const user = await getUserByToken(token);

        
        console.log(user)
        if(!user) {
            res.status(422).json({ message: "Acesso negado!" })
        }

        if(!calc_Potencia) {
            res.status(422).json({ message: "A potência é obrigatória!"})
            return
        }

        if(!calc_QuantEletro) {
            res.status(422).json({ message: "A quantidade de eletrodomésticos é obrigatória!"})
            return
        }

        if(!calc_QuantHours) {
            res.status(422).json({ message: "As horas são obrigatórias!"})
            return
        }

        if(!calc_QuantDays) {
            res.status(422).json({ message: "Os dias são obrigatórios!"})
            return
        }

        const calculoConsumo = (calc_QuantEletro * calc_Potencia * calc_QuantHours * calc_QuantDays) / 1000;

        if(!calculoConsumo) {
            res.status(422).json({ message: "Ocorreu um erro no momento do cálculo, verifique os campos novamente." })
        }

        const calculoGasto = calculoConsumo * 0.74;

        const variablesCalc = {
            tbUserUserId: user.user_Id,
            calc_Eletro,
            calc_QuantEletro,
            calc_Potencia,
            calc_QuantHours,
            calc_QuantDays,
            calc_Consumo: calculoConsumo,
            calc_Gasto: calculoGasto
        }

        try {
            await Calc.create(variablesCalc); 
            res.status(200).json({message: 'deu certo pai, tu é pica'});
        } catch(err) {
            res.status(200).json({message: 'deu errado danado, olha ai' + err});
        }
    }
}