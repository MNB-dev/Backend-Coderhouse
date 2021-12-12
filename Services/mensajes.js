const admin = require("firebase-admin");
const config = require("../config.js");
const { normalize, denormalize, schema } = require("normalizr");
const util = require('util');

admin.initializeApp({
  credential: admin.credential.cert(config.firebase)
});

const db = admin.firestore();
const query = db.collection("mensajes");
const asObj = (doc) => ({ id: doc.id, ...doc.data() });

// Definimos un esquema de usuarios (autores y comentadores)
const authorSchema = new schema.Entity('authors')

// Definimos un esquema de comentadores
const commentSchema = new schema.Entity('comments', {
  autor: authorSchema
})

// Definimos un esquema de artículos
const postSchema = new schema.Entity('posts', {
  author: authorSchema,
  comments: [ commentSchema ]
});


module.exports = {
  create: async (msg) => {
    try {

      await query.add({
        autor: msg[0].autor,
        mensaje: msg[0].mensaje,
        timestamp: msg[0].hora,
      });

      console.log("Se guardó el mensaje");
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  },
  getAll: async () => {
    try {
      const snapshot = await query.get();
      let mensajes = [];

      snapshot.forEach((doc) => {
        mensajes.push(asObj(doc));
      });

      const normalizedBlogpost = normalize(mensajes, postSchema);

      const inicial = JSON.stringify(mensajes).length;
      const final = JSON.stringify(normalizedBlogpost).length;
      const tamaño = final * 100 / inicial;

      console.log(util.inspect(normalizedBlogpost, false, 12, true));

      return {mensajes: mensajes, tamaño: tamaño.toFixed(2) };
    } catch (e) {
      console.log(e)
      throw new Error(e);
    }
  },
};
