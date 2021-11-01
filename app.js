const createError = require('http-errors');
const express = require('express');
const path = require('path');
const productosRouter = require('./routes/productos');
const indexRouter = require('./routes/index');
const hb = require('express-handlebars');

const app = express();

app.engine(
  "hbs",
  hb({
    extname:".hbs",
    defaultLayout:"index.hbs",
    layoutsDir: __dirname + "/views/layout",
    partialsDir:__dirname + "/views/partials/"
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname + '../public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
app.use('/api', productosRouter);

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

app.listen(8080)

module.exports = app;
