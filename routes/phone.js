const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

// Controlador
const { obtenerTelefonos, obtenerTelefonosByUser, obtenerTelefonoById, crearTelefono, actualizarTelefono, eliminarTelefono } = require('../controllers/phone');
// Rutas

// Obtener Teléfonos
router.get(
    '/',
    obtenerTelefonos
);

// Obtener Teléfonos por Id
router.get(
    '/:id', 
    validarJWT, obtenerTelefonoById
);

// Obtener Teléfonos por Usuario
router.get(
    '/user/:id',
    validarJWT, obtenerTelefonosByUser
);

// Crear cupo
router.post(
    '/create',
    [
        check('telefono','el teléfono es requerido').not().isEmpty(),
        check('idUsuario','el id del usuario es requerido').not().isEmpty(),
        check('idPais','el id del país es requerido').not().isEmpty()
    ],
    validarCampos,
    validarJWT,
    crearTelefono
);

// Actualizar cupo
router.put(
    '/update/:id',
    [
        check('telefono','el teléfono es requerido').not().isEmpty(),
        check('idUsuario','el id del usuario es requerido').not().isEmpty(),
        check('idPais','el id del país es requerido').not().isEmpty()
    ],
    validarCampos,
    validarJWT,
    actualizarTelefono
);

// Eliminar cupo
router.delete(
    '/delete/:id', 
    validarJWT, 
    eliminarTelefono
);

module.exports = router;