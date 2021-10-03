const fs = require("fs");

class Contenedor {
  constructor() {}

  async save(object) {
    try {
      let data = await fs.promises.readFile("./productos.txt", "utf-8");
      data = JSON.parse(data);
      object.id = data.length + 1;
      data.push(object);

      await fs.promises.writeFile(
        "./productos.txt",
        JSON.stringify(data, null, 2),
        "utf-8"
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      let data = await fs.promises.readFile("./productos.txt", "utf-8");
      data = JSON.parse(data);

      let product = data.filter((element) => {
        return element.id === id;
      });

      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile("./productos.txt", "utf-8");
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      let data = await fs.promises.readFile("./productos.txt", "utf-8");
      data = JSON.parse(data);

      data = data.filter((element) => {
        return element.id !== id;
      });

      await fs.promises.writeFile(
        "./productos.txt",
        JSON.stringify(data, null, 2)
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(
        "./productos.txt",
        JSON.stringify([], null, 2)
      );
    } catch (error) {
      console.log(error);
    }
  }
}

const objetosAGuardar = 2;
const id = 2;
const contenedor = new Contenedor();

contenedor
  .getAll()
  .then(async (data) => {
    let productosLength = data.length;

    console.log("Lista original: ", data);

    for (let index = 0; index < objetosAGuardar; index++) {
      await contenedor.save({
        title: `test ${productosLength + 1}`,
        price: productosLength + 1,
        thumbnail: `test ${productosLength + 1}`,
      });
    }

    console.log("Lista con más elementos: ", await contenedor.getAll());
  })
  .then(async () => {
    const producto = await contenedor.getById(id);
    console.log("Producto: ", producto);
    await contenedor.deleteById(producto[0].id);
    console.log("Lista sin producto: ", await contenedor.getAll());
  })
  .then(async () => {
    await contenedor.deleteAll();
    console.log("Lista vacia: ", await contenedor.getAll());
  });
