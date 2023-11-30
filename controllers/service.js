const { response } = require('express');
const cloudinary = require('cloudinary').v2;
const Service = require('../models/Service');

const obtenerServicios = async (req, resp = response) => {
    try {
        const servicios = await Service.find();

        return resp.status(200).json({
            ok: true,
            msg: 'Lista de servicios',
            servicios
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al listar servicios',
        })
    }
}

const obtenerServiciosById = async (req, resp = response) => {
    try {
        const ServiceId = req.params.id;
        const servicios = await Service.findById(ServiceId);

        if (!servicios) {
            return resp.status(200).json({
                ok: false,
                msg: 'El id no coincide con ningún servicio en la base de datos'
            });
        }
        
        return resp.status(200).json({
            ok: true,
            msg: 'Servicio por Id',
            servicios
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al obtener servicio',
        })
    }
}

const crearServicio = async (req, resp = response) => {
    try {
        const { nombre, descripcion, precio } = req.body;

        if (!nombre) {
            return resp.status(400).json({
                ok: false,
                msg: 'El nombre es requerido'
            });
        }

        if (!descripcion) {
            return resp.status(400).json({
                ok: false,
                msg: 'La descripcion es requerida'
            });
        }

        if (!precio) {
            return resp.status(400).json({
                ok: false,
                msg: 'El precio es requerido'
            });
        }

        const nuevoServicio = req.body;

        if (req.file) {
            const base64data = req.file.buffer.toString('base64');
            const result = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${base64data}`);
            
            const cloudinaryUrl = result.secure_url;
            nuevoServicio.cover = cloudinaryUrl;
        }

        const servicio = new Service(nuevoServicio);
        const servicioSave = await servicio.save();

        return resp.status(200).json({
            ok: true,
            msg: 'Servicio creado de manera exitosa',
            servicioSave
        });
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al crear el servicio',
        })
    }
}

const actualizarServicio = async (req, resp = response) => {
    try {
        const ServiceId = req.params.id;
        const { nombre, descripcion, precio } = req.body;
        
        if (!nombre) {
            return resp.status(400).json({
                ok: false,
                msg: 'El nombre es requerido'
            });
        }

        if (!descripcion) {
            return resp.status(400).json({
                ok: false,
                msg: 'La descripcion es requerida'
            });
        }

        if (!precio) {
            return resp.status(400).json({
                ok: false,
                msg: 'El precio es requerido'
            });
        }

        const servicios = await Service.findById(ServiceId);

        if (!servicios) {
            return resp.status(201).json({
                ok: false,
                msg: 'El id del servicio no coincide con ningun elemento en la base de datos',
            });
        }

        const nuevoServicio = req.body;

        if (req.file) {
            const base64data = req.file.buffer.toString('base64');
            const result = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${base64data}`);
            
            const cloudinaryUrl = result.secure_url;
            nuevoServicio.cover = cloudinaryUrl;
        }

        const servicioActualizado = await Service.findByIdAndUpdate(ServiceId, nuevoServicio, {new: true});

        return resp.status(200).json({
            ok: true,
            msg: 'Servicio actualizado de manera exitosa',
            servicios: servicioActualizado
        });
    } catch(error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al actualizar el servicio',
        });
    }
}

const eliminarServicio = async (req, resp = response) => {
    try {
        const ServiceId = req.params.id;
        const servicios = await Service.findById(ServiceId);

        if (!servicios) {
            return resp.status(201).json({
                ok: false,
                msg: 'El id del servicio no coincide con ningun elemento en la base de datos',
            });
        }

        await Service.findByIdAndDelete(ServiceId);

        return resp.status(200).json({
            ok: true,
            msg: 'Servicio eliminado de manera exitosa',
        });
    } catch(error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al eliminar el servicio',
        });
    }
} 

module.exports = {
    obtenerServicios,
    obtenerServiciosById,
    crearServicio,
    actualizarServicio,
    eliminarServicio
}