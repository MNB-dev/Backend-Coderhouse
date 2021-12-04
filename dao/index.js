//import config from '../../config.js'
import dotenv from 'dotenv';

dotenv.config();

let productosDao

console.log("service: " + process.env.SERVICE)

switch (process.env.SERVICE) {
    case 'json':
        const { default: ProductosDaoArchivo } = await import('./Productos/ProductosDaoArchivo.js')
        productosDao = new ProductosDaoArchivo(config.fileSystem.path)
        break
    case 'firebase':
        //const { default: ProductosDaoFirebase } = await import('./ProductosDaoFirebase.js')
        //ProductosDao = new ProductosDaoFirebase()
        console.log("hola firebase");
        break
    case 'mongodb':
        const { default: ProductosDaoMongoDb } = await import('./Productos/ProductosDaoMongoDb.js')
        productosDao = new ProductosDaoMongoDb();
        break
    default:
        ///const { default: ProductosDaoMem } = await import('./ProductosDaoMem.js')
        //ProductosDao = new ProductosDaoMem()
        console.log("hola default");
        break
}

export { productosDao }