const { response } = require('express');
const cloudinary = require('cloudinary').v2;
const Product = require('../models/Product');

const obtenerProductos = async (req, resp = response) => {
    try {
        const productos = await Product.find();

        return resp.status(200).json({
            ok: true,
            msg: 'Lista de productos',
            productos
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al listar productos',
        })
    }
}

const obtenerProductosById = async (req, resp = response) => {
    try {
        const ProductId = req.params.id;
        const productos = await Product.findById(ProductId);

        if (!productos) {
            return resp.status(200).json({
                ok: false,
                msg: 'El id no coincide con ningún producto en la base de datos'
            });
        }

        return resp.status(200).json({
            ok: true,
            msg: 'Producto por Id',
            productos
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al obtener producto',
        })
    }
}

const crearProducto = async (req, resp = response) => {
    try {
        const { nombre, precio } = req.body

        if (!nombre) {
            return resp.status(400).json({
                ok: false,
                msg: 'El nombre es requerido'
            });
        }

        if (!precio) {
            return resp.status(400).json({
                ok: false,
                msg: 'El precio es requerido'
            });
        }
        
        const nuevoProducto = req.body;

        if (req.file) {
            const base64data = req.file.buffer.toString('base64');
            const result = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${base64data}`);
            
            const cloudinaryUrl = result.secure_url;
            nuevoProducto.cover = cloudinaryUrl;
        }
        
        const producto = new Product(nuevoProducto);
        const productoSave = await producto.save();

        return resp.status(200).json({
            ok: true,
            msg: 'Producto creada de manera exitosa',
            productoSave
        });
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al crear el producto',
        })
    }
}

const actualizarProducto = async (req, resp = response) => {
    try {
        const ProductId = req.params.id;
        const { nombre, precio } = req.body;

        if (!nombre) {
            return resp.status(400).json({
                ok: false,
                msg: 'El nombre es requerido'
            });
        }

        if (!precio) {
            return resp.status(400).json({
                ok: false,
                msg: 'El precio es requerido'
            });
        }

        const producto = await Product.findById(ProductId);

        if (!producto) {
            return resp.status(201).json({
                ok: false,
                msg: 'El id del producto no coincide con ningun elemento en la base de datos',
            });
        }        
        
        const nuevoProducto = req.body;

        if (req.file) {
            const base64data = req.file.buffer.toString('base64');
            const result = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${base64data}`);
            
            const cloudinaryUrl = result.secure_url;
            nuevoProducto.cover = cloudinaryUrl;
        }

        const productoActualizado = await Product.findByIdAndUpdate(ProductId, nuevoProducto, {new: true});

        return resp.status(200).json({
            ok: true,
            msg: 'Producto actualizado de manera exitosa',
            productos: productoActualizado
        });
    } catch(error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al actualizar el producto',
        });
    }
}

const eliminarProducto = async (req, resp = response) => {
    try {
        const ProductId = req.params.id;
        const productos = await Product.findById(ProductId);

        if (!productos) {
            return resp.status(201).json({
                ok: false,
                msg: 'El id del producto no coincide con ningun elemento en la base de datos',
            });
        }

        await Product.findByIdAndDelete(ProductId);

        return resp.status(200).json({
            ok: true,
            msg: 'Producto eliminada de manera exitosa',
        });
    } catch(error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al eliminar el producto',
        });
    }
} 

module.exports = {
    obtenerProductos,
    obtenerProductosById,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}