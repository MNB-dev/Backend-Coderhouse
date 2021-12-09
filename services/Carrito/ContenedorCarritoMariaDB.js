import ContenedorProductoMariaDB from "../Productos/ContenedorProductoMariaDB.js";
import ClienteSql from "../sql.js";

const sql = new ClienteSql();

class ContenedorCarritoMariaDB {
  constructor() {}

  async getProducts(id) {
    try {
      const contenedorProductos = new ContenedorProductoMariaDB();
      const carrito = await sql.obtenerPorId("carritos", id);
      let productos = [];

      if (!carrito) return "El carrito no existe.";

      for (let index = 0; index < carrito.productos.length; index++) {
        const element = carrito.productos[index];
        const p = await contenedorProductos.getById(element);
        productos.push(p);
      }

      return productos;
    } catch (e) {
      throw new Error(e);
    }
  }

  async addProducto(id, id_prod) {
    try {
      const contenedorProductos = new ContenedorProductoMariaDB();
      const p = await contenedorProductos.getById(id_prod);

      if (!p) return "El producto no existe.";

      const carritoOriginal = await sql.obtenerPorId("carritos", id);

      if (!carritoOriginal) return "El carrito no existe.";

      const productos = carritoOriginal.productos;
      productos.push(id_prod);

      const body = {
        timestamp: Date.now(),
        productos: productos,
      };

      await sql.actualizar("carritos", id, body);

      return;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteProducto(id, id_prod) {
    try {
      const carritoOriginal = await sql.obtenerPorId("carritos", id);
      const productos = carritoOriginal.productos;
      const index = producto.findIndex((elem) => elem.id == id_prod);

      if (index == -1) {
        throw new Error(`Error al borrar: elemento no encontrado`);
      } else {
        productos.splice(index, 1)[0];

        const body = {
          timestamp: Date.now(),
          productos: productos,
        };

        await sql.actualizar("carritos", id, body);
      }

      return "Producto eliminado del carrito.";
    } catch (e) {
      throw new Error(e);
    }
  }

  async createCarrito() {
    try {
      const carrito = {
        timestamp: Date.now(),
        productos: [],
      };

      const c = await sql.insertar('carritos', carrito);
      return `Se creó un carrito con id: ${c.id}`;
    } catch (e) {
      throw new Error(e);
    }
  }

  async delete(id) {
    try {
      const c = await sql.borrarPorId('carritos', id);

      if (c.deletedCount == 0) return "El producto no existe.";

      return "Carrito eliminado";
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default ContenedorCarritoMariaDB;
