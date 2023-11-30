const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

// Controlador
const { obtenerEstados, obtenerEstadosById, crearEstado, actualizarEstado, eliminarEstado } = require('../controllers/state');

// Rutas
// Obtener Teléfonos
router.get(
    '/',
    obtenerEstados
);

// Obtener Teléfonos por Id
router.get(
    '/:id', 
    validarJWT, 
    obtenerEstadosById
);

// Crear cupo
router.post(
    '/create',
    [
        check('nombre','el nombre es requerido').not().isEmpty(),
        check('idPais','el id del pais es requerido').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    crearEstado
);

// Actualizar cupo
router.put(
    '/update/:id',
    [
        check('nombre','el nombre es requerido').not().isEmpty(),
        check('idPais','el id del pais es requerido').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    actualizarEstado
);

// Eliminar cupo
router.delete(
    '/delete/:id', 
    validarJWT, 
    eliminarEstado
);

module.exports = router;