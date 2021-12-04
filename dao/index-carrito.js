//import config from '../../config.js'
import dotenv from 'dotenv';

dotenv.config();

let carritoDao

console.log("service: " + process.env.SERVICE)

switch (process.env.SERVICE) {
    case 'json':
        const { default: CarritoDaoArchivo } = await import('./carrito/carritoDaoArchivo.js')
        carritoDao = new CarritoDaoArchivo();
        break
    case 'firebase':
        //const { default: carritoDaoFirebase } = await import('./carritoDaoFirebase.js')
        //carritoDao = new carritoDaoFirebase()
        console.log("hola firebase");
        break
    case 'mongodb':
        const { default: carritoDaoMongoDb } = await import('./carrito/carritoDaoMongoDb.js')
        carritoDao = new carritoDaoMongoDb();
        break
    default:
        ///const { default: carritoDaoMem } = await import('./carritoDaoMem.js')
        //carritoDao = new carritoDaoMem()
        console.log("hola default");
        break
}

export { carritoDao }