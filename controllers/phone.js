const { response } = require('express');

const Phone = require('../models/Phone');

const obtenerTelefonos = async (req, resp = response) => {
    try {
        const telefonos = await Phone.find()
            .populate("idPais", "nombre prefijo");

        return resp.status(200).json({
            ok: true,
            msg: 'Lista de Teléfonos',
            telefonos
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al listar teléfonos',
        })
    }
}
const obtenerTelefonosByUser = async (req, resp = response) => {
    try {
        const userId = req.params.id

        const telefonos = await Phone.find({idUsuario: userId})
            .populate("idPais", "nombre prefijo");

        return resp.status(200).json({
            ok: true,
            msg: 'Lista de Teléfonos',
            telefonos
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al listar teléfonos',
        })
    }
}

const obtenerTelefonoById = async (req, resp = response) => {
    try {
        const phoneId = req.params.id;

        const telefono = await Phone.findById(phoneId)
            .populate("idPais", "nombre prefijo");

        if(!telefono){
            return resp.status(200).json({
                ok: false,
                msg: 'El id no coincide con ningún teléfono en la base de datos'
            });
        }

        return resp.status(200).json({
            ok: true,
            msg: 'Telefono por Id',
            telefono
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al obtener teléfono',
        })
    }
}

const crearTelefono = async (req, resp = response) => {
    try {
        const telefono = new Phone(req.body);
        const telefonoSave = await telefono.save();

        return resp.status(200).json({
            ok: true,
            msg: 'Teléfono creado de manera exitosa',
            telefonoSave
        });
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al crear el teléfono',
        })
    }
}

const actualizarTelefono = async (req, resp = response) => {
    try {
        const phoneId = req.params.id;
        const telefono = await Phone.findById(phoneId);

        if(!telefono){
            return resp.status(201).json({
                ok: false,
                msg: 'El id del teléfono no coincide con ningun elemento en la base de datos',
            });
        }

        const telefonoActualizado = await Phone.findByIdAndUpdate(phoneId, req.body, {new: true});

        return resp.status(200).json({
            ok: true,
            msg: 'Teléfono actualizado de manera exitosa',
            telefono: telefonoActualizado
        });

    } catch(error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al actualizar el telefono',
        });
    }
}

const eliminarTelefono = async (req, resp = response) => {
    try {
        const phoneId = req.params.id;
        const telefono = await Phone.findById(phoneId);

        if(!telefono){
            return resp.status(201).json({
                ok: false,
                msg: 'El id del teléfono no coincide con ningun elemento en la base de datos',
            });
        }

        await Phone.findByIdAndDelete(phoneId);

        return resp.status(200).json({
            ok: true,
            msg: 'Teléfono eliminado de manera exitosa',
        });

    } catch(error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al eliminar el teléfono',
        });
    }
} 

module.exports = {
    obtenerTelefonos,
    obtenerTelefonosByUser,
    obtenerTelefonoById,
    crearTelefono,
    actualizarTelefono,
    eliminarTelefono
}