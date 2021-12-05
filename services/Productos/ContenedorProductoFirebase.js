const asObj = (doc) => ({ id: doc.id, ...doc.data() });

class ContenedorProductoFirebase {
  constructor(db) {
    this.query = db.collection("productos");
  }

  async getAll() {
    try {
      const snapshot = await this.query.get();
      let productos = [];

      snapshot.forEach((doc) => {
        productos.push(asObj(doc));
      });

      return productos;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getById(id) {
    try {
      const producto = await this.query.doc(id).get();

      console.log(producto)

      if (!producto._fieldsProto) return "El producto no existe.";

      return asObj(producto);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async create(body) {
    try {
      const producto = await this.query.add({
        name: body.name,
        price: body.price,
        description: body.description,
        code: body.code,
        picture: body.picture,
        stock: body.stock,
        timestamp: Date.now(),
      });

      const p = await this.getById(producto.id);
      return p;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async update(id, body) {
    try {
      const doc = await this.query.doc(id);
      const producto = await doc.update({
        name: body.name,
        price: body.price,
        picture: body.picture,
        description: body.description,
        stock: body.stock,
        code: body.code,
        timestamp: new Date()
      })

      if (!producto._fieldsProto)
        return "El producto no tiene ninguna modificación o no existe.";

      return;
    } catch (e) {
      console.log(e);
      return "No se pudo actualizar.";
    }
  }

  async delete(id) {
    try {
      const doc = await this.query.doc(id);
      await doc.delete();

      return "Producto eliminado";
    } catch (e) {
      console.log(e);
      return "Producto no pudo ser eliminado";
    }
  }
}

export default ContenedorProductoFirebase;
