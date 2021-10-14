const createError = require('http-errors');
const express = require('express');
const indexRouter = require('./routes/index');
const productos = require('./productos/productos');

const app = express();

app.use(express.json());
app.use('/', indexRouter);

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
  res.json({ error: true, message: err.message });
});

app.listen(8080, () => {
  productos.create();
})

module.exports = app;
