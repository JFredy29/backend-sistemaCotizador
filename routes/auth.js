const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { loginUsuario, crearUsuario, checkAuthStatus, actualizarUsuario, actualizarPassword, getUsuarioById } = require('../controllers/auth');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post(
    '/create',
    [
        check('nombre','EL nombre es obligatorio').not().isEmpty().trim(),
        check('apellido','EL apellido es obligatorio').not().isEmpty().trim(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    crearUsuario
);

router.post(
    '/login',
    [
        check('email','El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    loginUsuario
);

router.put(
    '/update/password',
    [
        check('password', 'El password debe ser de 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    validarJWT,
    actualizarPassword
);

router.put(
    '/update/:id',
    [
        check('nombre','EL nombre es obligatorio').not().isEmpty().trim(),
        check('apellidos','EL apellido es obligatorio').not().isEmpty().trim(),
        check('email', 'El email es obligatorio').isEmail(),
        check('telefono','El telefono debe ser de 10 caracteres').isLength({min:10}),
        check('documento','El documenot debe tener al menos 7 caracteres').isLength({min:7}),
        check('fechaNacimiento','La fecha de nacimiento es obligatoria').not().isEmpty(),
        validarCampos
    ],
    validarJWT,
    actualizarUsuario
);

router.get(
    '/profile/:id',
    validarJWT,
    getUsuarioById
);

router.get(
    '/check-status',
    validarJWT,
    checkAuthStatus
);

module.exports = router;