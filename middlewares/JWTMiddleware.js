const jwt = require('jsonwebtoken');

const JWTMiddleware = ( req,res,next ) => {
    const token = req.header('token');
    if( !token ){
        return res.status(403).json({
            ok: false,
            msg: 'Acceso no autorizado',
        });
    }
    try {
        const { id } = jwt.verify( token, process.env.JWTSecret );
        req.id = id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido',
        });
    }
}

module.exports = {
    JWTMiddleware
}