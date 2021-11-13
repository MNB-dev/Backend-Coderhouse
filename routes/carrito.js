const express = require("express");
const productos = require("../Services/carrito");
const router = express.Router();

router.get("/carrito/:id/productos", productos.getById);
router.post("/carrito", async (req, res, next) => {
});
router.post("/carrito/:id/productos", async (req, res, next) => {
  });
router.delete("/carrito/:id", productos.delete);
router.delete("/carrito/:id/productos", productos.delete);
module.exports = router;
