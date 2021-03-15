const { Router } = require('express');
const router = Router();
const {check} = require('express-validator');

const { validarCamposExpress } = require('../helpers/validarCamposExpress');
const { JWTMiddleware } = require('../middlewares/JWTMiddleware');
const { createPizza, getPizzas } = require('../controllers/pizza');

router.get( '/', JWTMiddleware, getPizzas );

router.post( '/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('price', 'El precio es obligatorio').not().isEmpty(),
    check('description', 'La ingredientes de la pizza obligatorios').not().isEmpty(),
    validarCamposExpress
], createPizza );

module.exports = router;