const { check } = require('express-validator');
const { Router } = require('express');
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

// Controlador
const { obtenerCiudades, obtenerCiudadesById, crearCiudad, actualizarCiudad, eliminarCiudad } = require('../controllers/city');

// Rutas
// Obtener Teléfonos
router.get(
    '/',
    obtenerCiudades
);

// Obtener Teléfonos por Id
router.get(
    '/:id', 
    validarJWT, 
    obtenerCiudadesById
);

// Crear cupo
router.post(
    '/create',
    [
        check('nombre','el nombre es requerido').not().isEmpty(),
        check('idDepartamento','el id del departamento es requerido').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    crearCiudad
);

// Actualizar cupo
router.put(
    '/update/:id',
    [
        check('nombre','el nombre es requerido').not().isEmpty(),
        check('idDepartamento','el id del departamento es requerido').not().isEmpty(),
    ],
    validarCampos,
    validarJWT,
    actualizarCiudad
);

// Eliminar cupo
router.delete(
    '/delete/:id', 
    validarJWT, 
    eliminarCiudad
);

module.exports = router;