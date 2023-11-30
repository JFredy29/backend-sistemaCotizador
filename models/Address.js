const { Schema, model } = require('mongoose');

const AddressSchema = Schema({
    direccion: {
        type: String,
        required: true
    },
    idUsuario: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    barrio: {
        type: String,
        required: true
    },
    idCiudad: {
        type: Schema.Types.ObjectId,
        ref: "City",
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Address', AddressSchema);