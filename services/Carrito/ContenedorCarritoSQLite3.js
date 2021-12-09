
import ContenedorProductoMariaDB from "../Productos/ContenedorProductoMariaDB.js";
import ClienteSql from "../sql.js";

const sql = new ClienteSql();

class ContenedorCarritoSQLite3 {
  constructor() {}

  async getProducts(id) {
    try {
      const contenedorProductos = new ContenedorProductoMariaDB();
      const carrito = await sql.obtenerPorId("carritos", id);
      let productos = [];

      if (!carrito) return "El carrito no existe.";
      const prodCarrito = JSON.parse(carrito[0].productos);

      for (let index = 0; index < prodCarrito.length; index++) {
        const element = prodCarrito[index];
        const p = await contenedorProductos.getById(element);
        productos.push(p);
      }

      return productos;
    } catch (e) {
        console.log(e);
      throw new Error(e);
    }
  }

  async addProducto(id, id_prod) {
    try {
      const contenedorProductos = new ContenedorProductoMariaDB();
      const p = await contenedorProductos.getById(id_prod);

      if (p == undefined) return "El producto no existe.";

      const carritoOriginal = await sql.obtenerPorId("carritos", id);

      if (carritoOriginal.length == 0) return "El carrito no existe.";

      const productos = JSON.parse(carritoOriginal[0].productos);
      productos.push(id_prod);

      const body = {
        timestamp: Date.now(),
        productos: JSON.stringify(productos),
      };

      await sql.actualizar("carritos", id, body);
      return;
    } catch (e) {
        console.log(e);
      throw new Error(e);
    }
  }

  async deleteProducto(id, id_prod) {
    try {
      const carritoOriginal = await sql.obtenerPorId("carritos", id);

      if (carritoOriginal.length == 0) return "El carrito no existe.";

      const productos = JSON.parse(carritoOriginal[0].productos);
      const index = productos.findIndex((elem) => parseInt(elem) == id_prod);

      if (index == -1) {
        throw new Error(`Error al borrar: elemento no encontrado`);
      } else {
        productos.splice(index, 1)[0];
        
        const body = {
          timestamp: Date.now(),
          productos: JSON.stringify(productos),
        };

        await sql.actualizar("carritos", id, body);
      }

      return "Producto eliminado del carrito.";
    } catch (e) {
        console.log(e);
      throw new Error(e);
    }
  }

  async createCarrito() {
    try {
      const carrito = {
        timestamp: Date.now(),
        productos: JSON.stringify([]),
      };

      const c = await sql.insertar('carritos', carrito);

      return `Se creó un carrito con id: ${c}`;
    } catch (e) {
        console.log(e);
      throw new Error(e);
    }
  }

  async delete(id) {
    try {
      const c = await sql.borrarPorId('carritos', id);

      if (!c) return "El producto no existe.";

      return "Carrito eliminado";
    } catch (e) {
        console.log(e);
      throw new Error(e);
    }
  }
}

export default ContenedorCarritoSQLite3;