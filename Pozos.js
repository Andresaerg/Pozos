const { Decimal128 } = require('bson');
const mongoose = require('mongoose');

const Pozos = mongoose.model('Pozo', {
    name: { type: String, required: true, minLength: 3},
    psi: { type: Decimal128, required: true, minLength: 3},
    fecha: { type: Date, required: true},
})

module.exports = Pozos;