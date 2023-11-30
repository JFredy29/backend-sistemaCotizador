const { response } = require('express');

const AdminRol = async (req, res = response, next) => {
    if (req.usuario) {
        const {nombre, rol} = req.usuario;

        if (rol !== "ADMINISTRADOR") {
            return res.status(201).json({
                ok: false,
                msg: `${nombre} no es administrador - no puede realizar está acción`
            });
        }
    } else {
        return res.status(400).json({
            ok: false,
            msg: 'Se quiere validar el rol sin validar el token'
        });
    }

    next();
}

module.exports = {
    AdminRol
}