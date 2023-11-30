const { Schema, model } = require('mongoose');

const CountrySchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    prefijo: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Country', CountrySchema);