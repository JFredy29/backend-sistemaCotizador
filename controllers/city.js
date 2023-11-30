const { response } = require('express');

const City = require('../models/City');

const obtenerCiudades = async (req, resp = response) => {
    try {
        const ciudades = await City.find()
            .populate({
                path: "idDepartamento", 
                select: "nombre", 
                populate: {
                    path: "idPais",
                    select: "nombre prefijo"
                }
            });

        return resp.status(200).json({
            ok: true,
            msg: 'Lista de Ciudades',
            ciudades
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al listar ciudades',
        })
    }
}


const obtenerCiudadesById = async (req, resp = response) => {
    try {
        const CityId = req.params.id;

        const ciudades = await City.findById(CityId)
            .populate({
                path: "idDepartamento", 
                select: "nombre", 
                populate: {
                    path: "idPais",
                    select: "nombre prefijo"
                }
            });

        if (!ciudades) {
            return resp.status(200).json({
                ok: false,
                msg: 'El id no coincide con ninguna ciudad en la base de datos'
            });
        }

        return resp.status(200).json({
            ok: true,
            msg: 'Ciudad por Id',
            ciudades
        });
    }
    catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al obtener ciudad',
        })
    }
}

const crearCiudad = async (req, resp = response) => {
    try {
        const ciudad = new City(req.body);
        const ciudadSave = await ciudad.save();

        return resp.status(200).json({
            ok: true,
            msg: 'Ciudad creada de manera exitosa',
            ciudadSave
        });
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al crear la ciudad',
        })
    }
}

const actualizarCiudad = async (req, resp = response) => {
    try {
        const CityId = req.params.id;
        const ciudades = await City.findById(CityId);

        if(!ciudades){
            return resp.status(201).json({
                ok: false,
                msg: 'El id de la ciudad no coincide con ningun elemento en la base de datos',
            });
        }

        const ciudadActualizada = await City.findByIdAndUpdate(CityId, req.body, {new: true});

        return resp.status(200).json({
            ok: true,
            msg: 'Ciudad actualizada de manera exitosa',
            ciudad: ciudadActualizada
        });
    } catch(error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al actualizar la ciudad',
        });
    }
}

const eliminarCiudad = async (req, resp = response) => {
    try {
        const CityId = req.params.id;
        const ciudades = await City.findById(CityId);

        if (!ciudades) {
            return resp.status(201).json({
                ok: false,
                msg: 'El id de la ciudad no coincide con ningun elemento en la base de datos',
            });
        }

        await City.findByIdAndDelete(CityId);

        return resp.status(200).json({
            ok: true,
            msg: 'Ciudad eliminada de manera exitosa',
        });
    } catch(error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al eliminar la ciudad',
        });
    }
} 

module.exports = {
    obtenerCiudades,
    obtenerCiudadesById,
    crearCiudad,
    actualizarCiudad,
    eliminarCiudad
}