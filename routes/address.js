const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

// Controlador
const { obtenerDirecciones, obtenerDireccionesByUser, obtenerDireccionById, crearDireccion, actualizarDireccion, eliminarDireccion } = require('../controllers/address');

// Rutas
// Obtener Teléfonos
router.get(
    '/',
    obtenerDirecciones
);

// Obtener Teléfonos por Id
router.get(
    '/:id', 
    validarJWT,
    obtenerDireccionById
);

// Obtener Teléfonos por Usuario
router.get(
    '/user/:id',
    validarJWT,
    obtenerDireccionesByUser
);

// Crear cupo
router.post(
    '/create',
    [
        check('direccion','el teléfono es requerido').not().isEmpty(),
        check('idUsuario','el id del usuario es requerido').not().isEmpty(),
        check('barrio','el barrio es requerido').not().isEmpty(),
        check('idCiudad','el id de la ciudad es requerido').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    crearDireccion
);

// Actualizar cupo
router.put(
    '/update/:id',
    [
        check('direccion','el teléfono es requerido').not().isEmpty(),
        check('idUsuario','el id del usuario es requerido').not().isEmpty(),
        check('barrio','el barrio es requerido').not().isEmpty(),
        check('idCiudad','el id de la ciudad es requerido').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    actualizarDireccion
);

// Eliminar cupo
router.delete(
    '/delete/:id', 
    validarJWT, 
    eliminarDireccion
);

module.exports = router;