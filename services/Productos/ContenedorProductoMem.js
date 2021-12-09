class ContenedorProductoMem {
  constructor() {
    this.productos = this.productos ? this.productos : [];
  }

  async getAll(id) {
    try {
      const producto = id
        ? await this.productos.find((elem) => elem.id == id)
        : this.productos;
      return producto;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getById(id) {
    try {
      const producto = await this.productos.find((elem) => elem.id == id);
      console.log(this.productos);
      console.log(producto);
      return producto;
    } catch (e) {
      console.log(e)
      throw new Error(e);
    }
  }

  async update(id, body) {
    try {
      const index = this.productos.findIndex((p) => p.id == id);
      const p = {
        id: id,
        name: body.name,
        price: body.price,
        description: body.description,
        code: body.code,
        picture: body.picture,
        stock: body.stock,
        timestamp: Date.now(),
      };

      if (index == -1) {
        throw new Error(`Error al actualizar: elemento no encontrado`);
      } else {
        this.productos[index] = p;
      }

      return;
    } catch (e) {
      throw new Error(e);
    }
  }

  async delete(id) {
    try {
      const index = this.productos.findIndex((elem) => elem.id == id);
      if (index == -1) {
        throw new Error(`Error al borrar: elemento no encontrado`);
      } else {
        this.productos.splice(index, 1)[0];
      }

      return "Producto eliminado.";
    } catch (e) {
      throw new Error(e);
    }
  }

  async create(body) {
    try {
      const id = this.productos.length > 0 ? this.productos[this.productos.length - 1].id + 1 : 0;
      const p = {
        id: id,
        name: body.name,
        price: body.price,
        description: body.description,
        code: body.code,
        picture: body.picture,
        stock: body.stock,
        timestamp: Date.now(),
      };

      this.productos.push(p);

      return p;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}

export default ContenedorProductoMem;
