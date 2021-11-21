const knexLib = require('knex');

class ClienteSql {
  constructor(config) {
    this.knex = knexLib(config)
  }

  crearTabla() {
    return this.knex.schema.dropTableIfExists('articulos')
      .finally(() => {
        return this.knex.schema.createTable('articulos', table => {
            table.increments('id').primary();
            table.string('name', 50).notNullable();
            table.string('code', 10).notNullable();
            table.float('price');
            table.integer('stock');
            table.string('description');
            table.string('picture');
            table.string('timestamp');
        })
      })
  }

  insertarArticulos(articulos) {
    return this.knex('articulos').insert(articulos);
  }

  listarArticulos() {
    return this.knex.select().table('articulos');
  }

  obtenerArticuloPorId(id) {
    return this.knex.table('articulos').where('id', id);
  }

  borrarArticuloPorId(id) {
    return this.knex.from('articulos').where('id', id).del();
  }

  actualizarProducto(body, id) {
    return this.knex.from('articulos').where('id', id).update({
        name: body.name,
        price: body.price,
        description: body.description,
        code: body.code,
        picture: body.picture,
        stock: body.stock,
        timestamp: Date.now()
    })
  }

  close() {
    this.knex.destroy();
  }
}

module.exports = ClienteSql;