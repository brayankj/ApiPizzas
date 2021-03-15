const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true }
});

UserSchema.method( 'toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model( 'User', UserSchema );
