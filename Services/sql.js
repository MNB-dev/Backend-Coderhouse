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
            table.string('titulo', 50).notNullable();
            table.float('price');
            table.string('thumbnail');
        })
      })
  }

  crearTabla3() {
    return this.knex.schema.dropTableIfExists('mensajes')
      .finally(() => {
        return this.knex.schema.createTable('mensajes', table => {
            table.increments('id').primary();
            table.string('mail');
            table.string('mensaje');
            table.string('hora');
        })
      })
  }

  insertarMensajes(mensajes) {
    return this.knex('mensajes').insert(mensajes);
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
        titulo: body.titulo,
        price: body.price,
        thumbnail: body.thumbnail,
    })
  }

  close() {
    this.knex.destroy();
  }
}

module.exports = ClienteSql;