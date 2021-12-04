import mongoose from '../bin/mongodb.js';

const carritoSchema = new mongoose.Schema({
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

const carritoModel = mongoose.model("carrito", carritoSchema);

class ContenedorCarritoMongoDb {
  constructor() {}

  async getAll() {
    try {
      const carrito = await carritoModel.find();
      return carrito;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getById(id) {
    try {
      const producto = await carritoModel.findById(id);
      console.log(id)
      console.log(producto);
      return producto;
    } catch (e) {
      throw new Error(e);
    }
  }

  async create(body) {
    try {
      const producto = new carritoModel({
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
      console.log(e);
      throw new Error(e);
    }
  }

  async update(id, body) {
    try {
      await carritoModel.updateOne(
        { _id: id },
        body
      );
      return "Producto modificado";
    } catch (e) {
      throw new Error(e);
    }
  }

  async delete(id) {
    try {
      const producto = await carritoModel.deleteOne({ _id: id});
      return "Producto eliminado";
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default ContenedorCarritoMongoDb;