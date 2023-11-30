const { Schema, model } = require('mongoose');

const PhoneSchema = Schema({
    telefono: {
        type: String,
        required: true
    },
    idUsuario: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    idPais: {
        type: Schema.Types.ObjectId,
        ref: "Country",
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Phone', PhoneSchema);