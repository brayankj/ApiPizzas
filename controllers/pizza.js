
const Pizza = require('../models/pizza');

const getPizzas = async( req, res ) => {
    try {
        const pizzas = await Pizza.find();
        res.status( 200 ).json({
            ok: true,
            pizzas,
        });
    } catch (error) {
        return res.status( 500 ).json({
            ok: false,
            msg: 'Error en el servidor *Pizza',
        });
    }
}

const createPizza = async( req, res ) => {

    try {
        const pizza = new Pizza( req.body );
        pizza.save();
        res.status( 200 ).json({
            ok: true,
            pizza
        });
    } catch (error) {
        return res.status( 500 ).json({
            ok: false,
            msg: 'Error en el servidor *Pizza',
        });
    }
}

module.exports = {
    getPizzas,
    createPizza,
}