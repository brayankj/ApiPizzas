const { Router } = require('express');
const router = Router();
const {check} = require('express-validator');

const { validarCamposExpress } = require('../helpers/validarCamposExpress');
const { JWTMiddleware } = require('../middlewares/JWTMiddleware');
const { createUser, getUser } = require('../controllers/user');

router.get( '/:id', JWTMiddleware, getUser );

router.post( '/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe contener al menor 6 caracteres').isLength({min:6}),
    check('email', 'Correo no valido intenta de nuevo').isEmail(),
    validarCamposExpress
], createUser );

module.exports = router;