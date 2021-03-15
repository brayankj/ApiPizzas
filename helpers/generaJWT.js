const jwt = require('jsonwebtoken');

const generaJwt = ( id ) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id,
        };
        jwt.sign( payload, process.env.JWTSecret, {
            expiresIn: '1h'
        }, (err, token ) => {
            if (err) {
                reject(err, 'No se pudo generar el tokens');
            }else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generaJwt,
}