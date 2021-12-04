import mongoose from "../../bin/mongodb.js";
import ContenedorMongoDb from "../Productos/ServiceProductoMongDb.js";

const carritoSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
  },
  productos: [{ producto: String }],
});

const carritoModel = mongoose.model("carrito", carritoSchema);

class ContenedorCarritoMongoDb {
  constructor() {}

  async getProducts(id) {
    try {
      const contenedorProductos = new ContenedorMongoDb();
      const carrito = await carritoModel.findById(id);
      let productos = [];

      if (!carrito) return "El carrito no existe.";

      for (let index = 0; index < carrito.productos.length; index++) {
        const element = carrito.productos[index];
        const p = await contenedorProductos.getById(element.producto);
        productos.push(p);
      }

      return productos; 
    } catch (e) {
      throw new Error(e);
    }
  }

  async addProducto(id, id_prod) {
    try {
      const contenedorProductos = new ContenedorMongoDb();
      const p = await contenedorProductos.getById(id_prod); 

      if (!p) return "El producto no existe.";

      const carrito = await carritoModel.findByIdAndUpdate(id, {
        $push: { productos: { producto: id_prod } },
      });

      if (!carrito) return "El carrito no existe.";

      return;
    } catch (e) {
        throw new Error(e);
    }
  }

  async deleteProducto(id, id_prod) {
    try {
      const carrito = await carritoModel.findByIdAndUpdate(
        id,
        { $pull: { productos: { producto: id_prod } } }
      );

      return "Producto eliminado del carrito.";
    } catch (e) {
        throw new Error(e);
    }
  }

  async createCarrito() {
    try {
      const carrito = new carritoModel({
        timestamp: Date.now(),
        productos: [],
      });

      const c = await carrito.save(carrito);
      return `Se creó un carrito con id: ${c.id}`;
    } catch (e) {
      throw new Error(e);
    }
  }

  async delete(id) {
    try {
      const c = await carritoModel.deleteOne({ _id: id });

      if (c.deletedCount == 0) return "El producto no existe.";

      return "Carrito eliminado";
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default ContenedorCarritoMongoDb;
