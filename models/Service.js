const { Schema, model } = require('mongoose');

const ServiceSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    cover: {
        type: String,
        default: "https://programacion.net/files/article/20161110041116_image-not-found.png"
    }
}, {
    timestamps: true
})

module.exports = model('Service', ServiceSchema);