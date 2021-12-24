const createError = require('http-errors');
const express = require('express');
const path = require('path');
const productosRouter = require('./routes/productos');
const toBoolean = require('to-boolean');
const dotenv = require('dotenv');
dotenv.config();
const admin = toBoolean(process.env.ADMIN);
const { options } = require('./Services/options/mysql');
const ClienteSql = require('./Services/sql');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const sql = new ClienteSql(options);
const sql3 = new ClienteSql({
  client: "sqlite3",
  connection: {
    filename: "./DB/ecommerce.sqlite",
  },
  useNullAsDefault: true
});

const config = require('./config');
const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const productosService = require("./Services/productos-bd");
const msgService = require("./Services/mensajes");
const PORT = 8080;
const productos = [];
let mensajes = [];

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

//--------------------------------------------
// configuro el socket

io.on("connection", async (socket) => {
  socket.emit("productos", productos);
  socket.on("update", (producto) => {
    productos.push(producto);
    productosService.create(producto);
    io.sockets.emit("productos", productos);
  });

  socket.emit("mensajes", mensajes);
  socket.on("update-persona", (data) => {
    mensajes.push(data);
    msgService.create(mensajes);
    io.sockets.emit("mensajes", mensajes);
  });

  socket.on("get-persona", async (data) => {
    mensajes = await msgService.getAll();
    io.sockets.emit("mostrar-mensajes", mensajes);
  });
});

//--------------------------------------------

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static("public"));

//app.use(cookieParser);
app.use(session({
  store: MongoStore.create({
      mongoUrl: config.mongo,
      ttl: 10000,
      mongoOptions: advancedOptions
  }),
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/login", loginRouter);
app.use('/api', productosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(async (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  await sql.close();
  await sql3.close();

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
  await sql.crearTabla();
  await sql3.crearTabla3();

  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});

connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);

module.exports = app;
