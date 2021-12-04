import express from 'express'
import createError from 'http-errors';
//import path from 'path';
import { productosRouter } from './routes/productos.js'
//import carritoRouter from './routes/carrito.js';
//const indexRouter = require('./routes/index');
import toBoolean from 'to-boolean';
import dotenv from 'dotenv';

dotenv.config();
const admin = toBoolean(process.env.ADMIN);

const app = express();

// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');*/

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use('/', indexRouter);
app.use('/api', productosRouter);
//app.use('/api', carritoRouter);

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

app.listen(8080)

export { app };
