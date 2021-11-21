const socket = io();

const formAgregarProducto = document.getElementById("formAgregarProducto");
formAgregarProducto.addEventListener("submit", (e) => {
  e.preventDefault();
  const producto = {
    titulo: formAgregarProducto[0].value,
    thumbnail: formAgregarProducto[1].value,
    price: formAgregarProducto[2].value
  };
  socket.emit("update", producto);
  formAgregarProducto.reset();
});

socket.on("productos", manejarEventoproductos);

async function manejarEventoproductos(productos) {
  const recursoRemoto = await fetch("plantillas/tabla-productos.hbs");
  const textoPlantilla = await recursoRemoto.text();
  const functionTemplate = Handlebars.compile(textoPlantilla);
  const html = functionTemplate({ productos });
  document.getElementById("productos").innerHTML = html;
}

const formAgregarPersona = document.getElementById("formAgregarPersona");
formAgregarPersona.addEventListener("submit", (e) => {
  e.preventDefault();
  const p = {
    mail: formAgregarPersona[0].value,
    mensaje: formAgregarPersona[1].value,
    hora: new Date(),
  };
  socket.emit("update-persona", p);
  formAgregarPersona.reset();
});

socket.on("mensajes", manejarEventoPersona);

async function manejarEventoPersona(msjs) {
  const mensajesHTML = msjs
    .map((msj) => {
      const d = new Date(msj.hora);
      const datestring =
        d.getDate() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getFullYear() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds();
      return `<h4 class="m-3"><span class="mail">${msj.mail} </span><span class="hora">${datestring} </span><span class="mensaje">${msj.mensaje}</span></h4>`;
    })
    .join("<br>");
  document.getElementById("Persona").innerHTML = mensajesHTML;
}
