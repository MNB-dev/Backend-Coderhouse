import ClienteSql from "../sql.js";

const sql = new ClienteSql();

class ContenedorProductoMariaDB {
  constructor() {}

  async getAll() {
    try {
      const productos = await sql.obtenerTodos('productos');
      return productos;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async getById(id) {
    try {
      const producto = await sql.obtenerPorId('productos', id);

      if(!producto) return "El producto no existe."

      return producto[0];
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async create(body) {
    try {
      const producto = {
        name: body.name,
        price: body.price,
        description: body.description,
        code: body.code,
        picture: body.picture,
        stock: body.stock,
        timestamp: Date.now(),
      };

      const id = await sql.insertar('productos', producto);
      const p = await sql.obtenerPorId('productos', id);

      return p[0];
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async update(id, body) {
    try {
      const producto = await sql.actualizar('productos', id, {
        name: body.name,
        price: body.price,
        description: body.description,
        code: body.code,
        picture: body.picture,
        stock: body.stock,
        timestamp: Date.now(),
      });

      if (producto == []) return "El producto no tiene ninguna modificación o no existe."
      
      return;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async delete(id) {
    try {
      const producto = await sql.borrarPorId('productos', id);

      if (!producto) return "El producto no existe."

      return "Producto eliminado";
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}

export default ContenedorProductoMariaDB;
