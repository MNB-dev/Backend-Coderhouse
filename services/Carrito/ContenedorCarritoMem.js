import ContenedorProductoMem from "../Productos/ContenedorProductoMem.js";

class ContenedorArchivoMem {
  constructor() {
    this.carritos = [];
  }

  async getProducts(id) {
    try {
      const contenedor = new ContenedorProductoMem();
      const carrito = await this.productos.find((elem) => elem.id == id);
      let productos = [];

      if (!carrito) return "El carrito no existe.";

      for (let index = 0; index < carrito[0].productos.length; index++) {
        const p = await contenedor.getById(carrito.productos[index]);
        productos.push(p);
      }

      return productos;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteProducto(id, id_prod) {
    try {
      const carrito = await this.productos.find((elem) => elem.id == id);
      const index = carrito.productos.findIndex((elem) => elem.id == id_prod);

      if (index == -1) {
        throw new Error(`Error al borrar: elemento no encontrado`);
      } else {
        carrito.productos.splice(index, 1)[0];
      }

      return "Producto eliminado del carrito.";
    } catch (e) {
      throw new Error(e);
    }
  }

  async update(carrito) {
    try {
      const index = this.carritos.findIndex((p) => p.id == carrito.id);

      if (index == -1) {
        return false;
      } else {
        this.carritos[index] = carrito;
      }

      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  async delete(id) {
    try {
      const index = this.carritos.findIndex((elem) => elem.id == id);
      if (index == -1) {
        throw new Error(`Error al borrar: elemento no encontrado`);
      } else {
        this.carritos.splice(index, 1)[0];
      }

      return "Carrito eliminado.";
    } catch (e) {
      throw new Error(e);
    }
  }

  async addProducto(id, id_prod) {
    try {
      const contenedor = new ContenedorProductoMem();
      const carrito = this.carritos.find((elem) => elem.id == id);
      if (!carrito) {
        throw new Error(`Error al borrar: elemento no encontrado`);
      }

      console.log(contenedor)
      console.log(carrito);
      console.log(id_prod);

      const p = await contenedor.getById(id_prod);

      console.log(p);

      if (!p) return "El producto no existe";

      carrito.productos.push({ productos: id_prod });

/*       const agregado = await update(carrito);

      if (!agregado) return "No pudo ser agregado."; */

      return;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  async createCarrito() {
    try {
      const id =
        this.carritos.length > 0
          ? this.carritos[this.carritos.length - 1].id + 1
          : 0;
      const carrito = {
        id: id,
        timestamp: Date.now(),
        productos: [],
      };

      this.carritos.push(carrito);

      return `Se creó un carrito con id: ${carrito.id}`;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default ContenedorArchivoMem;
