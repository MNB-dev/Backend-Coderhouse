const socket = io();

const formAgregarProducto = document.getElementById("formAgregarProducto");
formAgregarProducto.addEventListener("submit", (e) => {
  e.preventDefault();
  const producto = {
    titulo: formAgregarProducto[0].value,
    thumbnail: formAgregarProducto[1].value,
    price: formAgregarProducto[2].value,
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
    autor: {
      nombre: formAgregarPersona[0].value,
      apellido: formAgregarPersona[1].value,
      edad: formAgregarPersona[2].value,
      alias: formAgregarPersona[3].value,
      avatar: formAgregarPersona[4].value,
      id: formAgregarPersona[5].value,
    },
    mensaje: formAgregarPersona[6].value,
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
      return `<h4 class="m-3"><span class="mail">${msj.autor.nombre} </span><span class="hora">${datestring} </span><span class="mensaje">${msj.mensaje}</span></h4>`;
    })
    .join("<br>");
  document.getElementById("Persona").innerHTML = mensajesHTML;
}

async function obtenerMensajes() {
  socket.emit("get-persona");
}

socket.on("mostrar-mensajes", manejarEventoMostrarMensajes);

async function manejarEventoMostrarMensajes(msg) {
  const mensajesHTML = msg.mensajes
    .map((msj) => {
      return `<h4 class="m-3"><span class="mail">${msj.autor.nombre} </span><span class="hora">${msj.timestamp} </span><span class="mensaje">${msj.mensaje}</span></h4>`;
    })
    .join("<br>");
  document.getElementById("Persona").innerHTML = mensajesHTML;

  const porcentajeHTML = `<h4 class="m-3"> PORCENTAJE DE COMPRESION: ${msg.tamaño} % </h4>`;
  document.getElementById("Porcentaje").innerHTML = porcentajeHTML;
}