const { response } = require('express');

const Country = require('../models/Country');

const obtenerPaises = async (req, resp = response) => {
    try {
        const paises = await Country.find();

        return resp.status(200).json({
            ok: true,
            msg: 'Lista de paises',
            paises
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al listar paises',
        })
    }
}


const obtenerPaisesById = async (req, resp = response) => {
    try {
        const CountryId = req.params.id;
        const paises = await Country.findById(CountryId);

        if (!paises) {
            return resp.status(200).json({
                ok: false,
                msg: 'El id no coincide con ningun pais en la base de datos'
            });
        }
        
        return resp.status(200).json({
            ok: true,
            msg: 'Pais por Id',
            paises
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al obtener pais',
        })
    }
}

const crearPais = async (req, resp = response) => {
    try {
        const pais = new Country(req.body);
        const paisSave = await pais.save();

        return resp.status(200).json({
            ok: true,
            msg: 'Pais creado de manera exitosa',
            paisSave
        });
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al crear el pais',
        })
    }
}

const actualizarPais = async (req, resp = response) => {
    try {
        const CountryId = req.params.id;
        const paises = await Country.findById(CountryId);

        if (!paises) {
            return resp.status(201).json({
                ok: false,
                msg: 'El id del pais no coincide con ningun elemento en la base de datos',
            });
        }

        const paisActualizado = await Country.findByIdAndUpdate(CountryId, req.body, {new: true});

        return resp.status(200).json({
            ok: true,
            msg: 'Pais actualizado de manera exitosa',
            ciudad: paisActualizado
        });
    } catch(error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al actualizar el pais',
        });
    }
}

const eliminarPais = async (req, resp = response) => {
    try {
        const CountryId = req.params.id;
        const paises = await Country.findById(CountryId);

        if (!paises) {
            return resp.status(201).json({
                ok: false,
                msg: 'El id del estado no coincide con ningun elemento en la base de datos',
            });
        }

        await Country.findByIdAndDelete(CountryId);

        return resp.status(200).json({
            ok: true,
            msg: 'Pais eliminada de manera exitosa',
        });
    } catch(error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al eliminar el pais',
        });
    }
} 

module.exports = {
    obtenerPaises,
    obtenerPaisesById,
    crearPais,
    actualizarPais,
    eliminarPais
}