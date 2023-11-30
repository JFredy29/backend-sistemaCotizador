const { response } = require('express');

const Address = require('../models/Address');

const obtenerDirecciones = async (req, resp = response) => {
    try {
        const direcciones = await Address.find()
            .populate({
                path: "idCiudad",
                select: "nombre",
                populate: {
                    path: "idDepartamento",
                    select: "nombre",
                    populate: {
                        path: "idPais",
                        select: "nombre prefijo"
                    }
                }
            });

        return resp.status(200).json({
            ok: true,
            msg: 'Lista de Direcciones',
            direcciones
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al listar Direcciones',
        })
    }
}
const obtenerDireccionesByUser = async (req, resp = response) => {
    try {
        const userId = req.params.id
        const direcciones = await Address.find({idUsuario: userId})
            .populate({
                path: "idCiudad",
                select: "nombre",
                populate: {
                    path: "idDepartamento",
                    select: "nombre",
                    populate: {
                        path: "idPais",
                        select: "nombre prefijo"
                    }
                }
            });

        if (!direcciones) {
            return resp.status(400).json({
                ok: false,
                msg: 'No se encontrarón direcciones asociadas a ese usuario',
            });
        }

        return resp.status(200).json({
            ok: true,
            msg: 'Lista de Direcciones',
            direcciones
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al listar Direcciones',
        })
    }
}

const obtenerDireccionById = async (req, resp = response) => {
    try {
        const AddressId = req.params.id;
        const direcciones = await Address.findById(AddressId)
            .populate({
                path: "idCiudad",
                select: "nombre",
                populate: {
                    path: "idDepartamento",
                    select: "nombre",
                    populate: {
                        path: "idPais",
                        select: "nombre prefijo"
                    }
                }
            });

        if(!direcciones){
            return resp.status(200).json({
                ok: false,
                msg: 'El id no coincide con ninguna dirección en la base de datos'
            });
        }

        return resp.status(200).json({
            ok: true,
            msg: 'Direccion por Id',
            direcciones
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al obtener dirección',
        })
    }
}

const crearDireccion = async (req, resp = response) => {
    try {
        const direccion = new Address(req.body);
        const direccioSave = await direccion.save();

        return resp.status(200).json({
            ok: true,
            msg: 'Dirección creada de manera exitosa',
            direccioSave
        });
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al crear el dirección',
        })
    }
}

const actualizarDireccion = async (req, resp = response) => {
    try {
        const AddressId = req.params.id;
        const direcciones = await Address.findById(AddressId);

        if(!direcciones){
            return resp.status(201).json({
                ok: false,
                msg: 'El id de la dirección no coincide con ningun elemento en la base de datos',
            });
        }

        const direccionActualizada = await Address.findByIdAndUpdate(AddressId, req.body, {new: true});

        return resp.status(200).json({
            ok: true,
            msg: 'Dirección actualizada de manera exitosa',
            direcciones: direccionActualizada
        });
    } catch(error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al actualizar la dirección',
        });
    }
}

const eliminarDireccion = async (req, resp = response) => {
    try {
        const AddressId = req.params.id;
        const direcciones = await Address.findById(AddressId);

        if (!direcciones) {
            return resp.status(201).json({
                ok: false,
                msg: 'El id de la dirección no coincide con ningun elemento en la base de datos',
            });
        }

        await Address.findByIdAndDelete(AddressId);

        return resp.status(200).json({
            ok: true,
            msg: 'Dirección eliminada de manera exitosa',
        });
    } catch(error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al eliminar la dirección',
        });
    }
} 

module.exports = {
    obtenerDirecciones,
    obtenerDireccionesByUser,
    obtenerDireccionById,
    crearDireccion,
    actualizarDireccion,
    eliminarDireccion
}