
const express = require("express");
const productos = require("../Services/productos-bd3");
const router = express.Router();

router.get("/productos", productos.getProducts);
router.get("/productos/:id", productos.getProductoByID);

//Solo admin
router.post(
  "/productos",
  (req, res, next) => {
    req.app.validateUser(req, res, next);
  },
  productos.create
);
router.put(
  "/productos/:id",
  (req, res, next) => {
    req.app.validateUser(req, res, next);
  },
  productos.update
);
router.delete(
  "/productos/:id",
  (req, res, next) => {
    req.app.validateUser(req, res, next);
  },
  productos.delete
);

module.exports = router;
