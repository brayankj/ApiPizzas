const mongoose = require('mongoose');

const BdConnection = async () => {

    try {
        await mongoose.connect( process.env.BDName , {
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useFindAndModify : false,
            useCreateIndex : true,
        } );
        console.log('BD Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar con BD');
    }

}

module.exports = {
    BdConnection
}