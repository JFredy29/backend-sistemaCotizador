const { Schema, model } = require('mongoose');

const ProductSchema = Schema({
    nombre: {
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

module.exports = model('Product', ProductSchema);