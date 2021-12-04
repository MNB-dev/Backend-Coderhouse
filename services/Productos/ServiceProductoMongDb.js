import mongoose from '../../bin/mongodb.js';

const productosSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true],
    minlength: [3],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: [true],
    min: 1,
  },
  code: {
    type: Number,
    required: [true],
    min: 5,
  },
  stock: {
    type: Number,
    required: [true],
    min: 1,
  },
  picture: {
    type: String
  },
});

const productosModel = mongoose.model("productos", productosSchema);

class ContenedorMongoDb {
  constructor() {}

  async getAll() {
    try {
      const productos = await productosModel.find();
      return productos;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getById(id) {
    try {
      const producto = await productosModel.findById(id);

      if(!producto) return "El producto no existe."

      return producto;
    } catch (e) {
      return null;
    }
  }

  async create(body) {
    try {
      const producto = new productosModel({
        name: body.name,
        price: body.price,
        description: body.description,
        code: body.code,
        picture: body.picture,
        stock: body.stock,
        timestamp: Date.now(),
      });

      return await producto.save(producto);
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(id, body) {
    try {
      const producto = await productosModel.updateOne(
        { _id: id },
        body
      );

      if (producto.modifiedCount == 0) return "El producto no tiene ninguna modificación o no existe."
      
      return;
    } catch (e) {
      throw new Error(e);
    }
  }

  async delete(id) {
    try {
      const producto = await productosModel.deleteOne({ _id: id});

      if (producto.deletedCount == 0) return "El producto no existe."

      return "Producto eliminado";
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default ContenedorMongoDb;
