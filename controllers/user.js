const bcryptjs = require('bcryptjs');
const { generaJwt } = require('../helpers/generaJWT');
const User = require('../models/user');

const getUser = async( req, res ) => {
    const id = req.params.id;
    try {
        const userBD = await User.findById( id );
        if( !userBD ){
            return res.status( 400 ).json({
                ok: false,
                msg: 'El usuario no existe',
            });
        }
        res.status( 200 ).json({
            ok: true,
            user: userBD,
        });
    } catch (error) {
        return res.status( 500 ).json({
            ok: false,
            msg: 'Error en el servidor *Usuario',
        });
    }
}

const createUser = async( req, res ) => {
    const { email, password } = req.body;
    try {
        const userExist = await User.findOne( { email } );
        if ( userExist ) {
            return res.status( 400 ).json({
                ok: false,
                msg: 'El correo ingresado ya esta registrado',
            });
        }
        const user = new User( req.body );
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync( password, salt );
        await user.save();
        const token = await generaJwt( user.id );
        res.status( 200 ).json({
            ok: true,
            user,
            token,
        });
    } catch (error) {
        console.log(error)
        return res.status( 500 ).json({
            ok: false,
            msg: 'Error en el servidor *Usuario',
        });
    }
}

module.exports = {
    getUser,
    createUser,
}