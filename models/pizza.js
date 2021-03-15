const { Schema, model } = require('mongoose');

const PizzaSchema = Schema({
    name: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }
});

PizzaSchema.method( 'toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model( 'Pizza', PizzaSchema );