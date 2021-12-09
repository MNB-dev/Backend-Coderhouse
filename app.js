import express from "express";
import createError from "http-errors";
//import path from 'path';
import { productosRouter } from "./routes/productos.js";
import { carritoRouter } from "./routes/carrito.js";
//const indexRouter = require('./routes/index');
import toBoolean from "to-boolean";
import dotenv from "dotenv";
import { Server } from "http";
import ClienteSql from "./services/sql.js";

dotenv.config();
const admin = toBoolean(process.env.ADMIN);
const PORT = 8080;
const app = express();
const httpServer = new Server(app);

// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');*/

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use('/', indexRouter);
app.use("/api", productosRouter);
app.use("/api", carritoRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ error: true, message: err });
});

function validateUser(req, res, next) {
  if (!admin) {
    res.json({ status: 401, message: "No está autorizado." });
  } else {
    console.log("Autorizado");
    next();
  }
}
app.validateUser = validateUser;

const connectedServer = httpServer.listen(PORT, async () => {
  const bd = process.env.SERVICE;

  console.log(bd);

  if (bd == "mysql" || bd == "sql3") {
    const sql = new ClienteSql();

    await sql.crearTablaCarrito();
    await sql.crearTablaProducto();
  }

  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});

connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);

export { app };
