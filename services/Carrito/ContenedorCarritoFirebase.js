import ContenedorProductoFirebase from '../Productos/ContenedorProductoFirebase.js';
import admin from 'firebase-admin';

const asObj = (doc) => ({ id: doc.id, ...doc.data() });

class ContenedorCarritoFirebase {
  constructor(db) {
    this.db = db;
    this.query = db.collection('carrito');
  }

  async getProducts(id) {
    try {
      const contenedorProductos = new ContenedorProductoFirebase(this.db);
      let carrito = await this.query.doc(id).get();
      let productos = [];

      if (!carrito._fieldsProto) return "El carrito no existe.";
      carrito = asObj(carrito);

      for (let index = 0; index < carrito.productos.length; index++) {
        const element = carrito.productos[index];
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
      const contenedorProductos = new ContenedorProductoFirebase(this.db);
      const p = await contenedorProductos.getById(id_prod); 

      if (!p) return "El producto no existe.";
       const doc = await this.query.doc(id);
      let carrito = await this.query.doc(id).get();
      carrito = asObj(carrito);

      let productos = [id_prod];

      for (let index = 0; index < carrito.productos.length; index++) {
        const element = carrito.productos[index];

        productos.push(element);
      }

      await doc.update({
        timestamp: new Date(),
        productos: productos
      }) 
 
      return;
    } catch (e) {
      console.log(e);
        throw new Error(e);
    }
  }

  async deleteProducto(id, id_prod) {
    try {
      const doc = await this.query.doc(id);
      await doc.update({
        productos: admin.firestore.FieldValue.arrayRemove(id_prod)
      });

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
      const doc = await this.query.doc(id);
      await doc.delete();

      return "Carrito eliminado";
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}

export default ContenedorCarritoFirebase;
