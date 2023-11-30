const {response, request} = require('express');

const jwt = require('jsonwebtoken');
const Usuario = require('../models/User');

const validarJWT = async (req = request, res = response, next) => {

    let token = '';
    token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(200).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRET_KEY);

        const usuario = await Usuario.findById(uid);

        if (usuario) {
            req.uid = usuario.id
            req.usuario = usuario;
        } else {
            res.status(200).json({
                ok: false,
                msg: 'Token no valido'
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    validarJWT
}