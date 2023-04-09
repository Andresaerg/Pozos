const { Decimal128 } = require('bson');
const mongoose = require('mongoose');

const Datos = mongoose.model('Datos', {
    name: { type: String, required: true, minLength: 3},
    psi: { type: Decimal128, required: true, minLength: 3},
    fecha: { type: Date, required: true},
    id_pozo: { type: String, required: true},
})

module.exports = Datos;