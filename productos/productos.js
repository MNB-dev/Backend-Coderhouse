const fs = require("fs");
const url = "./public/productos.txt";

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
      console.log(error);
    }
  }

  async getById(id) {
    try {
      let data = await fs.promises.readFile(url, "utf-8");
      data = JSON.parse(data);

      let product = data.filter((element) => {
        return element.id == id;
      });

      if (product.length == 0) product = {error: 'Producto no encontrado.'}

      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, body) {
    try {
      let data = await fs.promises.readFile(url, "utf-8");
      data = JSON.parse(data);

      let product = data.filter((element) => {
        if(element.id == id) {
          element.title = body.title;
          element.price = body.price;
          element.thumbnail = body.thumbnail;
        };

        return element;
      });

      await this.deleteById(id);
      await this.save(product[0]);

      return product[0];
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(url, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(url, JSON.stringify([], null, 2));
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const contenedor = new Contenedor();
      const productos = await contenedor.getAll();
      res.json(productos);
    } catch (e) {
      next(e);
    }
  },
  getRandom: async (req, res, next) => {
    try {
      const contenedor = new Contenedor();
      const producto = await contenedor.getRandom();
      res.json(producto);
    } catch (e) {
      next(e);
    }
  },
  getById: async function (req, res, next) {
    try {
      const contenedor = new Contenedor();
      const producto = await contenedor.getById(req.params.id);
      res.json(producto);
    } catch (e) {
      next(e);
    }
  },
  update: async function (req, res, next) {
    try {
      const contenedor = new Contenedor();
      const producto = await contenedor.update(
        req.params.id,
        req.body
      );
      res.json(producto);
    } catch (e) {
      next(e);
    }
  },
  delete: async function (req, res, next) {
    try {
      const contenedor = new Contenedor();
      await contenedor.deleteById(req.params.id);
      res.json("Producto eliminado.");
    } catch (e) {
      next(e);
    }
  },
  create: async (req, res, next) => {
    try {
      const contenedor = new Contenedor();
      const producto = await contenedor.save({
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail,
      });

      res.json(producto);
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
};
