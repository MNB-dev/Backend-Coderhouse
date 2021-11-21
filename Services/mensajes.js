const ClienteSql = require('./sql');

const sql = new ClienteSql({
    client: "sqlite3",
    connection: {
      filename: "./DB/ecommerce.sqlite",
    },
    useNullAsDefault: true
  });


module.exports = {
    create: async (msg) => {
      try { 
        await sql.insertarMensajes(msg);

        console.log("Se guardó el mensaje");
      } catch (e) {
        console.log(e);
        next(e);
      }
    },
  };