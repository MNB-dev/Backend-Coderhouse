import { Router } from "express";
import { carritoDao } from "../dao/index.js";

const carritoRouter = Router();

carritoRouter.get("/carrito/:id/productos", async (req, res) => {
  try {
    const carrito = await carritoDao.getProducts(req.params.id);
    res.json(carrito);
  } catch (error) {
    res.json(error);
  }
});
carritoRouter.post("/carrito", async (req, res) => {
  try {
    const carrito = await carritoDao.createCarrito();
    res.json(carrito);
  } catch (error) {
    res.json(error);
  }
});
carritoRouter.post("/carrito/:id/productos", async (req, res) => {
  try {
    const agregado = await carritoDao.addProducto(req.params.id, req.body.id);
    
    if (agregado) {
      res.json(agregado)
    }
    else {
      const carrito = await carritoDao.getProducts(req.params.id);
      res.json(carrito);
    }
  } catch (error) {
    res.json(error);
  }
});

carritoRouter.delete("/carrito/:id", async (req, res) => {
  try {
    const carrito = await carritoDao.delete(req.params.id);
    res.json(carrito);
  } catch (error) {
    res.json(error);
  }
});

carritoRouter.delete("/carrito/:id/productos/:id_prod", async (req, res) => {
  try {
    const carrito = await carritoDao.deleteProducto(
      req.params.id,
      req.params.id_prod
    );
    res.json(carrito);
  } catch (error) {
    res.json(error);
  }
});

export { carritoRouter };
