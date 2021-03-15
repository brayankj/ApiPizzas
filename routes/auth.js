const { Router } = require('express');
const router = Router();

const { check } = require('express-validator');
const { validarCamposExpress } = require('../helpers/validarCamposExpress');
const { JWTMiddleware} = require('../middlewares/JWTMiddleware');

const { login, renewToken } = require('../controllers/auth');

router.post('/',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCamposExpress
], login);

router.get( '/newToken', JWTMiddleware, renewToken );

module.exports = router;