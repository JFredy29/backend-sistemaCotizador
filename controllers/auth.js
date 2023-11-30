const bcrypt = require('bcryptjs');
const { response } = require('express');

const Usuario = require('../models/User');
const { generarJWT } = require('../helpers/generar-jwt');

/* Crear Usuario */
const crearUsuario = async (req, resp = response) => {
    try {
        const { email, password } = req.body;

        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return resp.status(200).json({
                ok: false,
                msg: 'Ya existe un usuario registrado con ese email'
            })
        }

        usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT(usuario.id);

        return resp.status(200).json({
            ok: true,
            msg: 'Registro de usuario exitoso',
            uid: usuario.id,
            name: usuario.nombre,
            rol: usuario.rol,
            token
        });
    } catch (error) {
        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al crear el usuario'
        })
    }
}

/*  Iniciar Sesión  */
const loginUsuario = async (req, resp = response) => {
    try {
        const { email, password } = req.body;

        //confirmar email
        let usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return resp.status(200).json({
                ok: false,
                msg: 'Usuario o contraseña erradas'
            });
        }

        //confirmar contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);
        
        if (!validPassword) {
            return resp.status(200).json({
                ok: false,
                msg: 'Usuario o contraseña erradas'
            });
        }

        const token = await generarJWT(usuario.id);

        return resp.status(200).json({
            ok: true,
            msg: 'Sesión Iniciada',
            uid: usuario.id,
            name: usuario.nombre,
            rol: usuario.rol,
            token
        });
    } catch(error) {
        return resp.status(500).json({
            ok: false,
            msg: 'Error al autenticar'
        });
    }
}

const actualizarPassword = async (req, resp = response) => {
    try {
        const {password} = req.body;
        const usuarioAutenticado = req.usuario;

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuarioAutenticado.password = bcrypt.hashSync(password, salt);

        await Usuario.findByIdAndUpdate(usuarioAutenticado.id, usuarioAutenticado, { new: true });

        return resp.status(200).json({
            ok: true,
            msg: 'Contraseña actualizada de manera exitosa'
        });

    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al actualizar la contraseña',
        });
    }
}

/* Obtener usuario por ID */
const getUsuarioById = async (req, resp = response) => {
    try {
        const {id} = req.params;
        const usuario = await Usuario.findById(id);

        if (!usuario) {
            return resp.status(200).json({
                ok: false,
                msg: 'El id no coincide con ningun registro en la base de datos',
            });
        }

        resp.status(200).json({
            ok: true,
            msg: 'Usuario',
            usuario
        });
    } catch (error) {
        console.log(error);
        resp.status(400).json({
            ok: false,
            msg: 'error al listar Usuario',
        });
    }
}

const actualizarUsuario = async (req, resp = response) => {
    try {
        const usuarioId = req.params.id;
        
        const usuario = await Usuario.findById(usuarioId);

        if (!usuario) {
            return resp.status(200).json({
                ok: false,
                msg: 'El id no coincide con ningun registro en la base de datos',
            });
        }
        
        const usuarioActualizado = await Usuario.findByIdAndUpdate(usuarioId, req.body, {new: true});

        return resp.status(200).json({
            ok: true,
            msg: 'Usuario actualizado exitosamente',
            usuario: usuarioActualizado
        });
        
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'error al actualizar usuario',
        });
    }
}


const checkAuthStatus = async (req, resp = response) => {
    try {
        const { uid } = req;
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return resp.status(200).json({
                ok: false,
                msg: 'El id no coincide con ningun registro en la base de datos',
            });
        }

        const token = await generarJWT(uid);

        return resp.status(200).json({
            ok: true,
            msg: 'Usuario Validado',
            uid: usuario.id,
            name: usuario.nombre,
            rol: usuario.rol,
            token
        });
    } catch (error) {
        console.log(error);
        return resp.status(400).json({
            ok: false,
            msg: 'Error al validar usuario',
        });
    }
}

module.exports = {
    crearUsuario,
    loginUsuario,
    checkAuthStatus,
    actualizarUsuario,
    actualizarPassword,
    getUsuarioById
}