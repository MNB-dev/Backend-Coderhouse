import mongoose from '../bin/mongodb.js';

const carritoSchema = new mongoose.Schema({
  timestamp: {
    type: Date
  },
  productos: {
    type: []
  }
});

const carritoModel = mongoose.model("carrito", carritoSchema);

class ContenedorCarritoMongoDb {
  constructor() {}

  async getProducts(id) {
    try {
      const carrito = await carritoModel.findById(id);
      return carrito[0].productos;
    } catch (e) {
      throw new Error(e);
    }
  }

  async addProducto(id, id_prod) {
    try {
      const carrito = await contenedor.update( {_id: id}, { $pullAll: {_id: [id_prod] } } )
      res.json(carrito);
    } catch (e) {
      console.log(e);
      next(e);
    }
  }

  async deleteProducto(id, id_prod) {
    try {
      await contenedor.updateOne( {_id: id}, { $pullAll: {_id: [id_prod] } } )
      res.json("Producto eliminado del carrito.");
    } catch (e) {
      next(e);
    }
  }

  async createCarrito() {
    try {
      const carrito = new carritoModel({
        timestamp: Date.now(),
        productos: []
      });

      const c = await producto.save(carrito);
      return `Se creó un carrito con id: ${c.id}`
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async delete(id) {
    try {  
      await carritoModel.deleteOne({ _id: id});
      return "Carrito eliminado";
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default ContenedorCarritoMongoDb;