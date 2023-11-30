const multer = require('multer');

const { Router } = require('express');
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');

// Controlador
const { obtenerProductos, obtenerProductosById, crearProducto, actualizarProducto, eliminarProducto } = require('../controllers/product');

// Configurar Multer para manejar archivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rutas
// Obtener Teléfonos
router.get(
    '/',
    obtenerProductos
);

// Obtener Teléfonos por Id
router.get(
    '/:id',
    obtenerProductosById
);

// Crear cupo
router.post(
    '/create',
    validarJWT,
    upload.single("cover"),
    crearProducto
);

// Actualizar cupo
router.put(
    '/update/:id',
    validarJWT,
    upload.single("cover"),
    actualizarProducto
);

// Eliminar cupo
router.delete(
    '/delete/:id', 
    validarJWT, 
    eliminarProducto
);

module.exports = router;