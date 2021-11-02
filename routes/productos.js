const express = require("express");
const productos = require("../productos/productos");
const router = express.Router();

router.get("/productos", async (req, res, next) => {
  await productos.getAll().then((data) => {
    res.render("main", { layout: 'productos', data: data });
  });
});
router.get("/productos/:id", productos.getById);
router.post("/productos", async (req, res, next) => {
  await productos
    .create(req)
    .then(async () => {
      return await productos.getAll();
    })
    .then((data) => {
      res.render("main", { layout: 'productos',data: data });
    });
});
router.put("/productos/:id", productos.update);
router.delete("/productos/:id", productos.delete);

module.exports = router;
