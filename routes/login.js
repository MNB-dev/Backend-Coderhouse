const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("login", { layout: "login" });
});

router.get(
  "/ingreso",
  (req, res, next) => {

    if(req.session.contador){
      req.session.contador++;
      console.log(`Ud ha visitado el sitio ${req.session.contador} veces.`);
    }else{
      console.log("Nuevo logeo");
      req.session.contador = 1
      req.session.nombre = req.query.name;
    }
    
    res.render("main", { layout: "index", nombre: req.query.name });
  }
);

router.get(
  "/salir",
  (req, res, next) => {
    req.session.destroy(err => {
      console.log(err);
      if (err) {
        res.json({ status: 'Logout ERROR', body: err })
      } 

      res.render("logout");
    })
  }
);

module.exports = router;
