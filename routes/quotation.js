const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

// Controlador
const { obtenerCotizaciones, obtenerCotizacionesById, obtenerCotizacionesByUser, crearCotizacion, actualizarCotizacion, eliminarCotizacion, cambiarEstadoCotizacion } = require('../controllers/quotation');

// Rutas
// Obtener Teléfonos
router.get(
    '/',
    obtenerCotizaciones
);

// Obtener Teléfonos por Usuario
router.get(
    '/user/:id', 
    validarJWT, 
    obtenerCotizacionesByUser
);

// Obtener Teléfonos por Id
router.get(
    '/:id', 
    validarJWT, 
    obtenerCotizacionesById
);

// Crear cupo
router.post(
    '/create',
    [
        check('idUsuario','el id del usuario es requerido').not().isEmpty(),
        check('servicios','los servicios son requeridos').not().isEmpty(),
        check('productos','los productos son requeridos').not().isEmpty(),
        check('total','el total es requerido').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    crearCotizacion
);

// Actualizar cupo
router.put(
    '/update/:id',
    [
        check('idUsuario','el id del usuario es requerido').not().isEmpty(),
        check('servicios','los servicios son requeridos').not().isEmpty(),
        check('productos','los productos son requeridos').not().isEmpty(),
        check('total','el total es requerido').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    actualizarCotizacion
);

// Cambiar Estado
router.put(
    '/change-status/:id',
    [
        check('estado','El estado es requerido').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    cambiarEstadoCotizacion
);

// Eliminar cupo
router.delete(
    '/delete/:id',
    validarJWT,
    eliminarCotizacion
);

module.exports = router;