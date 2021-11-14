const express = require("express");
const carrito = require("../Services/carrito");
const router = express.Router();

router.get("/carrito/:id/productos", carrito.getProducts);
router.post("/carrito", carrito.createCarrito);
router.post("/carrito/:id/productos", carrito.addProducto);
router.delete("/carrito/:id", carrito.delete);
router.delete("/carrito/:id/productos/:id_prod", carrito.deleteProducto);
module.exports = router;
