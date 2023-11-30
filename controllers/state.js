const { response } = require('express');

const State = require('../models/State');

const obtenerEstados = async (req, resp = response) => {
    try {
        const estados = await State.find()
            .populate("idPais", "nombre prefijo");

        return resp.status(200).json({
            ok: true,
            msg: 'Lista de estados',
            estados
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al listar estados',
        })
    }
}


const obtenerEstadosById = async (req, resp = response) => {
    try {
        const StateId = req.params.id;
        
        const estados = await State.findById(StateId)
            .populate("idPais", "nombre prefijo");

        if (!estados) {
            return resp.status(200).json({
                ok: false,
                msg: 'El id no coincide con ningun estado en la base de datos'
            });
        }

        return resp.status(200).json({
            ok: true,
            msg: 'Estado por Id',
            estados
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al obtener estado',
        })
    }
}

const crearEstado = async (req, resp = response) => {
    try {
        const estado = new State(req.body);
        const estadoSave = await estado.save();

        return resp.status(200).json({
            ok: true,
            msg: 'Estado creado de manera exitosa',
            estadoSave
        });
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al crear el estado',
        })
    }
}

const actualizarEstado = async (req, resp = response) => {
    try {
        const StateId = req.params.id;
        const estados = await State.findById(StateId);

        if(!estados){
            return resp.status(201).json({
                ok: false,
                msg: 'El id del estado no coincide con ningun elemento en la base de datos',
            });
        }

        const estadoActualizado = await State.findByIdAndUpdate(StateId, req.body, {new: true});

        return resp.status(200).json({
            ok: true,
            msg: 'Estado actualizado de manera exitosa',
            ciudad: estadoActualizado
        });
    } catch(error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al actualizar la ciudad',
        });
    }
}

const eliminarEstado = async (req, resp = response) => {
    try {
        const StateId = req.params.id;
        const estados = await State.findById(StateId);

        if (!estados) {
            return resp.status(201).json({
                ok: false,
                msg: 'El id del estado no coincide con ningun elemento en la base de datos',
            });
        }

        await State.findByIdAndDelete(StateId);

        return resp.status(200).json({
            ok: true,
            msg: 'Estado eliminada de manera exitosa',
        });
    } catch(error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al eliminar el estado',
        });
    }
} 

module.exports = {
    obtenerEstados,
    obtenerEstadosById,
    crearEstado,
    actualizarEstado,
    eliminarEstado
}