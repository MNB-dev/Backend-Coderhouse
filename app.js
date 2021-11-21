const createError = require('http-errors');
const express = require('express');
const path = require('path');
const productosRouter = require('./routes/productos');
const carritoRouter = require('./routes/carrito');
const indexRouter = require('./routes/index');
const toBoolean = require('to-boolean');
const dotenv = require('dotenv');
dotenv.config();
const admin = toBoolean(process.env.ADMIN);
const { options } = require('./Services/options/mysql');
const ClienteSql = require('./Services/sql');

const sql = new ClienteSql(options);

const app = express();

// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');*/

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use('/', indexRouter);
app.use('/api', productosRouter);
app.use('/api', carritoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

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

app.listen(8080, async () => {
  await sql.crearTabla();
})

module.exports = app;
