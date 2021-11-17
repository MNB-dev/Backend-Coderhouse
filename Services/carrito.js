const fs = require("fs");
const { hasUncaughtExceptionCaptureCallback } = require("process");
const url = "./public/carrito.txt";

class Contenedor {
  constructor() {}

  async save(object) {
    try {
      let data = await fs.promises.readFile(url, "utf-8");
      data = JSON.parse(data);
      object.id = object.id ? object.id : data.length + 1;
      data.push(object);

      await fs.promises.writeFile(url, JSON.stringify(data, null, 2), "utf-8");

      return object;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      let data = await fs.promises.readFile(url, "utf-8");
      data = JSON.parse(data);

      let product = data.filter((element) => {
        return element.id == id;
      });

      if (product.length == 0) product = { error: "Producto no encontrado." };

      return product;
    } catch (error) {
      throw error;
    }
  }

  async getProducto(id) {
    try {
      const productos = require("../Services/productos");
      const prod = await productos.getProductoByID(id);
      
      if(prod.error) throw "El producto no existe";

      return prod[0];
    } catch (error) {
      throw error;
    }
  }

  async update(id, body) {
    try {
      const data = await fs.promises.readFile(url, "utf-8");
      const producto = await this.getProducto(body.id);
      let carrito = await JSON.parse(data).filter(carrito => carrito.id == id);
      carrito[0].productos.push(producto);

      await this.deleteById(id);
      await this.save(carrito[0]);

      return carrito[0];
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(url, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      let data = await fs.promises.readFile(url, "utf-8");
      data = JSON.parse(data);

      data = data.filter((element) => {
        return element.id != id;
      });

      await fs.promises.writeFile(url, JSON.stringify(data, null, 2));
    } catch (error) {
      throw error;
    }
  }

  async deleteProductoById(carritoId, productoId) {
    try {
      let data = await fs.promises.readFile(url, "utf-8");
      data = JSON.parse(data);

      data.forEach((element) => {
        if(element.id == carritoId) {
          element.productos = element.productos.filter((p) => {
            return p.id != productoId
          });
        }
      });

      await fs.promises.writeFile(url, JSON.stringify(data, null, 2));
    } catch (error) {
     throw error;
    }
  }
}

module.exports = {
  getProducts: async (req, res, next) => {
    try {
      const contenedor = new Contenedor();
      const carrito = await contenedor.getById(req.params.id);
      res.json(carrito[0].productos);
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  deleteProducto: async (req, res, next) => {
    try {
      const contenedor = new Contenedor();
      await contenedor.deleteProductoById(req.params.id, req.params.id_prod);
      res.json("Producto eliminado del carrito.");
    } catch (e) {
      next(e);
    }
  },
  delete: async (req, res, next) => {
    try {
      const contenedor = new Contenedor();
      await contenedor.deleteById(req.params.id);
      res.json("Carrito eliminado.");
    } catch (e) {
      next(e);
    }
  },
  addProducto: async (req, res, next) => {
    try {
      const contenedor = new Contenedor();
      const carrito = await contenedor.update(req.params.id, req.body);
      res.json(carrito);
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  createCarrito: async (req, res, next) => {
    try {
      const contenedor = new Contenedor();
      const carrito = await contenedor.save({
        timestamp: Date.now(),
        productos: [],
      });

      res.json(`Se creó un carrito con id: ${carrito.id}`);
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
};
