const { Schema, model } = require('mongoose');

const QuotationSchema = Schema({
    idUsuario: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    servicios: [{
        servicio: {
            type: Schema.Types.ObjectId,
            ref: "Service",
        }, 
        cantidad: {
            type: Number,
            required: true
        },
        precio: {
            type: Number,
            required: true
        }
    }],
    productos: [{
        producto: {
            type: Schema.Types.ObjectId,
            ref: "Product",
        }, 
        cantidad: {
            type: Number,
            required: true
        }, 
        precio: {
            type: Number,
            required: true
        }
    }],
    status: {
        type: String,
        default: "PENDIENTE"
    },
    total: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
})

module.exports = model('Quotation', QuotationSchema);