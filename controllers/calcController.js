const Calc = require('../models/Calc');


module.exports = class calcController {
    
    static async createCalc(req, res) {
        const { tbUserUserId, calc_Eletro, calc_Potencia, calc_QuantEletro, calc_QuantHours, calc_QuantDays, calc_Consumo, calc_Gasto } = req.body;


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

        const calculoGasto = calculoConsumo * 0.74;

        await Calc.create({calc_Eletro, calc_QuantEletro, calc_Potencia, calc_QuantHours, calc_QuantDays, calc_Consumo: calculoConsumo, calc_Gasto: calculoGasto }); 

        res.json({message: 'deu certo pai, tu é pica'});
        

    }
}