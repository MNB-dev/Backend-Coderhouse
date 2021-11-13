const express = require("express");
const productos = require("../Services/productos");
const router = express.Router();

router.get("/productos", productos.getProducts);
router.get("/productos/:id", productos.getProducts);
router.post("/productos", productos.create);
router.put("/productos/:id", productos.update);
router.delete("/productos/:id", productos.delete);

module.exports = router;
