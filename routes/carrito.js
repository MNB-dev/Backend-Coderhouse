import { Router } from "express";
import { carritoDao } from "../dao/index-carrito.js";

const router = Router();

router.get("/carrito/:id/productos", async (req, res) => {
  const productos = await carritoDao.getProducts(req.params.id);
  res.json(productos);
});
router.post("/carrito", async (req, res) => {
  const productos = await carritoDao.createCarrito();
  res.json(productos);
});
router.post("/carrito/:id/productos", async (req, res) => {
  const productos = await carritoDao.addProducto(req.params.id, req.body.id);
  res.json(productos);
});
router.delete("/carrito/:id", async (req, res) => {
  const productos = await carritoDao.delete(req.params.id);
  res.json(productos);
});
router.delete("/carrito/:id/productos/:id_prod", async (req, res) => {
  const productos = await carritoDao.carrito.deleteProducto(
    req.params.id,
    req.body.id
  );
  res.json(productos);
});

export default { router };
