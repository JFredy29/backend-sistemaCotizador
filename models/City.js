const { Schema, model } = require('mongoose');

const CitySchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    idDepartamento: {
        type: Schema.Types.ObjectId,
        ref: "State",
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('City', CitySchema);