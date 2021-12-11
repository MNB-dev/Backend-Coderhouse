class ContenedorMem {
    constructor() {
      this.productos = [];
      this.carritos = [];
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
            const index1 = this.carritos.findIndex((elem) => elem.id == id);

            if (index1 == -1) {
                throw new Error(`Error al borrar: elemento no encontrado`);
              } else {
                this.carritos.splice(index, 1)[0];
              }

              return "Carrito eliminado.";
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

    async getProducts(id) {
        try {
          const carrito = await this.productos.find((elem) => elem.id == id);
          let productos = [];
    
          if (!carrito) return "El carrito no existe.";
    
          for (let index = 0; index < carrito[0].productos.length; index++) {
            const p = await this.getById(carrito.productos[index]);
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
    
/*       async update(carrito) {
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
      } */
    
/*       async delete(id) {
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
      } */
    
      async addProducto(id, id_prod) {
        try {
          const carrito = this.carritos.find((elem) => elem.id == id);

          console.log(this.carritos);

          if (!carrito) {
            throw new Error(`Error al borrar: elemento no encontrado`);
          }

          console.log(carrito);

          const p = await this.getById(id_prod);
    
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
          console.log("hola")
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
          console.log(e);
          throw new Error(e);
        }
      }
  }
  
  export default ContenedorMem;
  