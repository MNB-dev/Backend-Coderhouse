import fs from "fs";
import ContenedorProductoArchivo from '../Productos/ContenedorProductoArchivo.js';
const url = "./public/carrito.txt";

console.log(url)
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
      const contenedor = new ContenedorProductoArchivo();
      const prod = await contenedor.getById(id);
      
      if(prod.error) return null;

      return prod[0];
    } catch (error) {
      return null
    }
  }

  async update(id, id_prod) {
    try {
      const data = await fs.promises.readFile(url, "utf-8");
      const producto = await this.getProducto(id_prod);

      if(!producto) return 'El producto no existe'

      let carrito = await JSON.parse(data).filter(carrito => carrito.id == id);

      if (carrito.length == 0) return null;

      carrito[0].productos.push(producto.id);

      await this.deleteById(id);
      await this.save(carrito[0]);

      return carrito[0];
    } catch (error) {
      console.log(error);
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
      data = data.filter((element) => {
        return element.id == carritoId;
      });

      data[0].productos = data[0].productos.filter((element) => {
        return element != productoId;
      });

      await fs.promises.writeFile(url, JSON.stringify(data, null, 2));
    } catch (error) {
      console.log(error);
     throw error;
    }
  }
}

class ContenedorCarritoArchivo {
  async getProducts(id) {
    try {
      const contenedor = new Contenedor();
      const carrito = await contenedor.getById(id);
      let productos = [];
      
      if (!carrito) return "El carrito no existe.";

      for (let index = 0; index < carrito[0].productos.length; index++) {
        const p = await contenedor.getProducto(carrito[0].productos[index]);
        productos.push(p);
      }

      return productos; 
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteProducto(id, id_prod){
    try {
      const contenedor = new Contenedor();
      await contenedor.deleteProductoById(id, id_prod);
      return "Producto eliminado del carrito.";
    } catch (e) {
      throw new Error(e);
    }
  }

  async delete (id){
    try {
      const contenedor = new Contenedor();
      await contenedor.deleteById(id);
      return"Carrito eliminado.";
    } catch (e) {
      throw new Error(e);
    }
  }

  async addProducto(id, id_prod) {
    try {
      const contenedor = new Contenedor();
      const carrito = await contenedor.update(id, id_prod);

      if (!carrito) return "El carrito no existe.";

      return;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async createCarrito() {
    try {
      const contenedor = new Contenedor();
      const carrito = await contenedor.save({
        timestamp: Date.now(),
        productos: [],
      });

      return `Se creó un carrito con id: ${carrito.id}`;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
};

export default ContenedorCarritoArchivo;