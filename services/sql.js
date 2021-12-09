import config from "../config.js";
import knexLib from "knex";

const bd = process.env.SERVICE;
let options; 

if(bd == 'mysql'){
  options = config.mysql;
}
else {
  options = config.sqlite3;
}


class ClienteSql {
  constructor() {
    this.knex = knexLib(options);
  }

  crearTablaProducto() {
    return this.knex.schema.dropTableIfExists("productos").finally(() => {
      return this.knex.schema.createTable("productos", (table) => {
        table.increments("id").primary();
        table.string("name");
        table.integer("price");
        table.string("description");
        table.integer("code");
        table.integer("stock");
        table.string("picture");
        table.string("timestamp");
      });
    });
  }

  crearTablaCarrito() {
    return this.knex.schema.dropTableIfExists("carritos").finally(() => {
      return this.knex.schema.createTable("carritos", (table) => {
        table.increments("id").primary();
        table.string("timestamp");
        table.json('productos')
      });
    });
  }

  insertar(tabla, articulos) {
    return this.knex(tabla).insert(articulos);
  }

  obtenerTodos(tabla) {
    return this.knex.select().table(tabla);
  }

  obtenerPorId(tabla, id) {
    return this.knex.table(tabla).where("id", id);
  }

  borrarPorId(tabla,id) {
    return this.knex.from(tabla).where("id", id).del();
  }

  actualizar(tabla, id, body) {
    return this.knex.from(tabla).where("id", id).update(body);
  }

  close() {
    this.knex.destroy();
  }
}

export default ClienteSql;
