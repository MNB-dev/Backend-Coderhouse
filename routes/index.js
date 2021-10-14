const express = require('express');
const productos = require('../productos/productos')
const router = express.Router();

router.get('/productos', productos.getAll);
router.get('/productosRandom', productos.getRandom);

module.exports = router;
