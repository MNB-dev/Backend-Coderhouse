const createError = require("http-errors");
const express = require("express");
const path = require("path");
const productosRouter = require("./routes/productos");
const indexRouter = require("./routes/index");
const hb = require("express-handlebars");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const msgService = require("./service/mensajes");
const PORT = 8080;
const productos = [];
const mensajes = [];

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//--------------------------------------------
// configuro el socket

io.on("connection", async (socket) => {
  console.log('Nuevo cliente conectado!');

  socket.emit("productos", productos);
  socket.on("update", (producto) => {
    productos.push(producto);
    io.sockets.emit("productos", productos);
  });

  socket.emit("mensajes", mensajes);
  socket.on("update-persona", (data) => {
    mensajes.push(data);
    msgService.create(mensajes);
    io.sockets.emit("mensajes", mensajes);
  });
});

//--------------------------------------------

app.engine(
  "hbs",
  hb({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layout",
    partialsDir: __dirname + "/views/partials/",
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", indexRouter);
app.use("/api", productosRouter);

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
  res.json({ error: true, message: err.message });
});

const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);

module.exports = app;
