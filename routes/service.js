const multer = require('multer');

const { Router } = require('express');
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');

// Controlador
const { obtenerServicios, obtenerServiciosById, crearServicio, actualizarServicio, eliminarServicio } = require('../controllers/service');

// Configurar Multer para manejar archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rutas
// Obtener Teléfonos
router.get(
    '/',
    obtenerServicios
);

// Obtener Teléfonos por Id
router.get(
    '/:id', 
    validarJWT, 
    obtenerServiciosById
);

// Crear cupo
router.post(
    '/create',
    validarJWT,
    upload.single("cover"),
    crearServicio
);

// Actualizar cupo
router.put(
    '/update/:id',
    validarJWT,
    upload.single("cover"),
    actualizarServicio
);

// Eliminar cupo
router.delete(
    '/delete/:id', 
    validarJWT, 
    eliminarServicio
);

module.exports = router;