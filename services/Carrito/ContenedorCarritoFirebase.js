import ContenedorProductoFirebase from '../Productos/ContenedorProductoFirebase.js';
import admin from 'firebase-admin';
import { initializeApp } from "firebase-admin/app";

class ContenedorCarritoFirebase {
  constructor(db) {
    this.query = db.collection('carrito');
  }

  async getProducts(id) {
    try {
      const contenedorProductos = new ContenedorMongoDb();
      const carritoSnapshot = await this.query.get();
      const docsSnapshot = carritoSnapshot.docs;
      const carrito = docsSnapshot.find(a => a.id == id);
      
      let productos = [];

      if (!carrito) return "El carrito no existe.";

      for (let index = 0; index < carrito.productos.length; index++) {
        const element = carrito.productos[index];
        const p = await contenedorProductos.getById(element.producto);
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
      const contenedorProductos = new ContenedorProductoFirebase();
      const p = await contenedorProductos.getById(id_prod); 

      if (!p) return "El producto no existe.";

      const carrito = await carritoModel.findByIdAndUpdate(id, {
        $push: { productos: { producto: id_prod } },
      });

      if (!carrito) return "El carrito no existe.";

      return;
    } catch (e) {
      console.log(e);
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
      console.log(e);
        throw new Error(e);
    }
  }

  async createCarrito() {
    try {
      const c = await this.query.add({
        timestamp: Date.now(),
        productos: [],
      });
      return `Se creó un carrito con id: ${c.id}`;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async delete(id) {
    try {
      const c = await carritoModel.deleteOne({ _id: id });

      if (c.deletedCount == 0) return "El producto no existe.";

      return "Carrito eliminado";
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}

export default ContenedorCarritoFirebase;
