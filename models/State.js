const { Schema, model } = require('mongoose');

const StateSchema = Schema({
    nombre: {
        type: String,
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

module.exports = model('State', StateSchema);