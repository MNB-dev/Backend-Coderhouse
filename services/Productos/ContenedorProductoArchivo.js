import fs from "fs";
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
          element.name = body.name,
          element.price = body.price,
          element.description = body.description,
          element.code = body.code,
          element.picture = body.picture,
          element.stock = body.stock,
          element.timestamp = Date.now()
        };

        return element;
      });

      await this.deleteById(id);
      await this.save(product[id - 1]);

      return product[id - 1];
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

class ContenedorProductoArchivo {
  async getAll(id) {
    try {
      const contenedor = new Contenedor();
      const producto = id ? await contenedor.getById(id) : await contenedor.getAll();
      return producto;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getByID(id) {
    try {
      const contenedor = new Contenedor();
      const producto = await contenedor.getById(id);
      return producto;
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(id, body) {
    try {
      const contenedor = new Contenedor();
      const producto = await contenedor.update(
        id,
        body
      );
      return producto;
    } catch (e) {
      throw new Error(e);
    }
  }

  async delete(id) {
    try {
      const contenedor = new Contenedor();
      await contenedor.deleteById(id);
      return "Producto eliminado.";
    } catch (e) {
      throw new Error(e);
    }
  }

  async create(body) {
    try {
      const contenedor = new Contenedor();
      await contenedor.save({
        name: body.name,
        price: body.price,
        description: body.description,
        code: body.code,
        picture: body.picture,
        stock: body.stock,
        timestamp: Date.now()
      });

      return "El producto fue agregado.";
    } catch (e) {
      throw new Error(e);
    }
  }
};

export default ContenedorProductoArchivo;