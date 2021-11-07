const fs = require("fs");
const url = "./public/mensajes.txt";

module.exports = {
    create: async (msg) => {
      try {
        await fs.promises.writeFile(url, JSON.stringify(msg, null, 2), "utf-8");
      } catch (e) {
        console.log(e);
        next(e);
      }
    },
  };