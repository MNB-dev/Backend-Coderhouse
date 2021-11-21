const { options } = require('./options/mysql');
const ClienteSql = require('./sql');

const sql = new ClienteSql(options);

module.exports = {
  getProducts: async (req, res, next) => {
    try {
      const producto = await sql.listarArticulos();
      res.json(producto);
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  getProductoByID: async (req, res, next) => {
    try {
      const producto = await sql.obtenerArticuloPorId(req.params.id);
      res.json(producto[0]);
    } catch (e) {
      console.log(e);
    }
  },
  update: async (req, res, next) => {
    try {
      await sql.actualizarProducto(
        req.body,
        req.params.id
      );
      res.json("Producto actualizado.");
    } catch (e) {
      next(e);
    }
  },
  delete: async (req, res, next) => {
    try {
      await sql.borrarArticuloPorId(req.params.id);
      res.json("Producto eliminado.");
    } catch (e) {
      next(e);
    }
  },
  create: async (req, res, next) => {
    try {
      const producto = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        code: req.body.code,
        picture: req.body.picture,
        stock: req.body.stock,
        timestamp: Date.now()
      };

      await sql.insertarArticulos(producto);

      res.json("El producto fue agregado.");
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
};
