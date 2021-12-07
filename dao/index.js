import dotenv from 'dotenv';

dotenv.config();

let carritoDao, productosDao; 

switch (process.env.SERVICE) {
    case 'json':
        const { default: ProductosDaoArchivo } = await import('./Productos/ProductosDaoArchivo.js')
        productosDao = new ProductosDaoArchivo();
        const { default: CarritoDaoArchivo } = await import('./carrito/carritoDaoArchivo.js')
        carritoDao = new CarritoDaoArchivo();
        break
    case 'firebase':
        const { db } = await import('../db/firebase-db.js');
        const { default: ProductosDaoFirebase } = await import('./Productos/ProductosDaoFirebase.js')
        productosDao = new ProductosDaoFirebase(db);
        const { default: carritoDaoFirebase } = await import('./carrito/CarritoDaoFirebase.js')
        carritoDao = new carritoDaoFirebase(db);
        break
    case 'mongodb':
        const { default: ProductosDaoMongoDb } = await import('./Productos/ProductosDaoMongoDb.js')
        productosDao = new ProductosDaoMongoDb();
        const { default: carritoDaoMongoDb } = await import('./carrito/carritoDaoMongoDb.js')
        carritoDao = new carritoDaoMongoDb();
        break
    default:
        const { default: ProductosDaoMem } = await import('./Productos/ProductosDaoMem.js')
        productosDao = new ProductosDaoMem();
        const { default: CarritoDaoMem } = await import('./carrito/CarritoDaoMem.js')
        carritoDao = new CarritoDaoMem();
        break
}

export { carritoDao, productosDao }