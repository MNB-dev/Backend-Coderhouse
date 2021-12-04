import { Router } from "express";
import { productosDao } from "../dao/index.js";

const productosRouter = Router();

productosRouter.get("/productos", async (req, res) => {
  const productos = await productosDao.getAll();
  res.json(productos);
});
productosRouter.get("/productos/:id", async (req, res) => {
  const producto = await productosDao.getById(req.params.id);
  res.json(producto);
});

//Solo admin
productosRouter.post(
  "/productos",
  (req, res, next) => {
    req.app.validateUser(req, res, next);
  },
  async (req, res, next) => {
    try {
      const producto = await productosDao.create(req.body);

      res.send(producto);
    } catch (error) {
      res.json(error);
    }
  }
);
productosRouter.put(
  "/productos/:id",
  (req, res, next) => {
    req.app.validateUser(req, res, next);
  },
  async (req, res, next) => {
    try {
      await productosDao.update(req.params.id, req.body);
      const producto = await productosDao.getById(req.params.id);
      res.json(producto);
    } catch (error) {
      res.json(error);
    }
  }
);
productosRouter.delete(
  "/productos/:id",
  (req, res, next) => {
    req.app.validateUser(req, res, next);
  },
  async (req, res, next) => {
    try {
      const producto = await productosDao.delete(req.params.id);
      res.json(producto);  
    } catch (error) {
      res.json(error);
    }
  }
);

export { productosRouter };
