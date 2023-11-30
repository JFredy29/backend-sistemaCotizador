const { response } = require('express');

const Quotation = require('../models/Quotation');

const obtenerCotizaciones = async (req, resp = response) => {
    try {
        const cotizaciones = await Quotation.find()
            .populate('idUsuario servicios.servicio productos.producto');

        return resp.status(200).json({
            ok: true,
            msg: 'Lista de cotizaciones',
            cotizaciones
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al listar cotizaciones',
        })
    }
}

const obtenerCotizacionesByUser = async (req, resp = response) => {
    try {
        const userId = req.params.id
        const cotizaciones = await Quotation.find({idUsuario: userId})
            .populate('idUsuario servicios.servicio productos.producto');

        if (!cotizaciones) {
            return resp.status(200).json({
                ok: false,
                msg: 'El id no coincide con ninguna cotización en la base de datos'
            });
        }

        return resp.status(200).json({
            ok: true,
            msg: 'Cotización por Id',
            cotizaciones
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al obtener cotización',
        })
    }
}

const obtenerCotizacionesById = async (req, resp = response) => {
    try {
        const QuotationId = req.params.id;
        const cotizaciones = await Quotation.findById(QuotationId)
            .populate('idUsuario servicios.servicio productos.producto');

        if (!cotizaciones) {
            return resp.status(200).json({
                ok: false,
                msg: 'El id no coincide con ninguna cotización en la base de datos'
            });
        }

        return resp.status(200).json({
            ok: true,
            msg: 'Cotización por Id',
            cotizaciones
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al obtener cotización',
        })
    }
}

const crearCotizacion = async (req, resp = response) => {
    try {
        const servicio = new Quotation(req.body);
        const cotizacionSave = await servicio.save();

        return resp.status(200).json({
            ok: true,
            msg: 'Cotización creada de manera exitosa',
            cotizacionSave
        });
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al crear el cotización',
        })
    }
}

const cambiarEstadoCotizacion = async (req, resp = response) => {
    try {
        const { estado } = req.body
        const QuotationId = req.params.id;

        let cotizacion = await Quotation.findById(QuotationId);

        if (!cotizacion) {
            return resp.status(201).json({
                ok: false,
                msg: 'El id de la cotización no coincide con ningun elemento en la base de datos',
            });
        }

        cotizacion.status = estado;

        const cotizacionActualizada = await Quotation.findByIdAndUpdate(QuotationId, cotizacion, {new: true});

        return resp.status(200).json({
            ok: true,
            msg: 'Estado de la cotización actualizado de manera exitosa',
            cotizaciones: cotizacionActualizada
        });
    } catch(error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al actualizar la cotización',
        });
    }
}

const actualizarCotizacion = async (req, resp = response) => {
    try {
        const QuotationId = req.params.id;
        const cotizaciones = await Quotation.findById(QuotationId);

        if (!cotizaciones) {
            return resp.status(201).json({
                ok: false,
                msg: 'El id de la cotización no coincide con ningun elemento en la base de datos',
            });
        }

        const cotizacionActualizada = await Quotation.findByIdAndUpdate(QuotationId, req.body, {new: true});

        return resp.status(200).json({
            ok: true,
            msg: 'Cotización actualizada de manera exitosa',
            cotizaciones: cotizacionActualizada
        });
    } catch(error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al actualizar la cotización',
        });
    }
}

const eliminarCotizacion = async (req, resp = response) => {
    try {
        const QuotationId = req.params.id;
        const cotizaciones = await Quotation.findById(QuotationId);

        if (!cotizaciones) {
            return resp.status(201).json({
                ok: false,
                msg: 'El id de la cotización no coincide con ningun elemento en la base de datos',
            });
        }

        await Quotation.findByIdAndDelete(QuotationId);

        return resp.status(200).json({
            ok: true,
            msg: 'Cotización eliminado de manera exitosa',
        });
    } catch(error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al eliminar la cotización',
        });
    }
} 

module.exports = {
    crearCotizacion,
    eliminarCotizacion,
    obtenerCotizaciones,
    actualizarCotizacion,
    cambiarEstadoCotizacion,
    obtenerCotizacionesById,
    obtenerCotizacionesByUser,
}