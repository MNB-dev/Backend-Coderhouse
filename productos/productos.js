const fs = require("fs");
const url = "./public/productos.txt";

class Contenedor {
  constructor() {}

  async save(object) {
    try {
      let data = await fs.promises.readFile(url, "utf-8");
      data = JSON.parse(data);
      object.id = data.length + 1;
      data.push(object);

      await fs.promises.writeFile(url, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      let data = await fs.promises.readFile(url, "utf-8");
      data = JSON.parse(data);

      let product = data.filter((element) => {
        return element.id === id;
      });

      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async getRandom() {
    try {
      let data = await fs.promises.readFile(url, "utf-8");
      data = JSON.parse(data);
      const num = (Math.random() * data.length).toFixed();

      let product = data.filter((element) => {
        return element.id == num;
      });

      return product;
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
        return element.id !== id;
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
  create: async (req, res, next) => {
    try {
      const objetosAGuardar = 3;
      const contenedor = new Contenedor();
      const productos = await contenedor.getAll();

      if(productos.length >= 3) return;
 
      for (let index = 0; index < objetosAGuardar; index++) {
        await contenedor.save({
          title: `test ${index}`,
          price: 120 + index,
          thumbnail: `test ${index}`,
        });
      }
    } catch (e) {
      next(e);
    }
  }
};
