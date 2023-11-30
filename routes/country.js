const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

// Controlador
const { obtenerPaises, obtenerPaisesById, crearPais, actualizarPais, eliminarPais } = require('../controllers/country');

// Rutas
// Obtener Teléfonos
router.get(
    '/',
    obtenerPaises
);

// Obtener Teléfonos por Id
router.get(
    '/:id', 
    validarJWT, 
    obtenerPaisesById
);

// Crear cupo
router.post(
    '/create',
    [
        check('nombre','el nombre es requerido').not().isEmpty(),
        check('prefijo','el prefijo es requerido').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    crearPais
);

// Actualizar cupo
router.put(
    '/update/:id',
    [
        check('nombre','el nombre es requerido').not().isEmpty(),
        check('prefijo','el prefijo es requerido').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    actualizarPais
);

// Eliminar cupo
router.delete(
    '/delete/:id', 
    validarJWT, 
    eliminarPais
);

module.exports = router;