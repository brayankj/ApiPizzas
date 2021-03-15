const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generaJwt } = require('../helpers/generaJWT');

const login = async( req, res ) => {
    const { email, password } = req.body;
    try {
        const userBD = await User.findOne( { email } );
        if( !userBD ) {
            return res.status(404).json({ 
                ok: false,
                msg: 'El correo no està registrado',
            });
        }
        const validPass = bcryptjs.compareSync( password, userBD.password );
        if ( !validPass ) {
            return res.status(404).json({ 
                ok: false,
                msg: 'El correo o la contraseña son incorrectos',
            });
        }
        const token = await generaJwt(userBD.id);
        res.status(200).json({ 
            ok: true,
            token
        });
    } catch (error) {
        return res.status(500).json({ 
            ok: false,
            msg: 'Error en el servidor *Login',
        });
    }
}

const renewToken = async( req, res ) => {
    const userActive = req.id;
    const token = await generaJwt( userActive );
    const user = await User.findById( userActive );
    res.status(200).json({ 
        ok: true,
        token,
        user,
    });
}

module.exports = {
    login,
    renewToken,
}