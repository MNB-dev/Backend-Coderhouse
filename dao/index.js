import dotenv from 'dotenv';

dotenv.config();

let carritoDao, productosDao; 

switch (process.env.SERVICE) {
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
    case 'sqlite3':
        const { default: ProductosDaoSQLite3 } = await import('./Productos/ProductosDaoSQLite3.js')
        productosDao = new ProductosDaoSQLite3();
        const { default: CarritoDaoSQLite3 } = await import('./carrito/CarritoDaoSQLite3.js')
        carritoDao = new CarritoDaoSQLite3();
        break
    case 'mysql':
        const { default: ProductosDaoMariaDB } = await import('./Productos/ProductosDaoMariaDB.js')
        productosDao = new ProductosDaoMariaDB();
        const { default: CarritoDaoMariaDB } = await import('./carrito/CarritoDaoMariaDB.js')
        carritoDao = new CarritoDaoMariaDB();
        break
    default:
        const { default: ProductosDaoArchivo } = await import('./Productos/ProductosDaoArchivo.js')
        productosDao = new ProductosDaoArchivo();
        const { default: CarritoDaoArchivo } = await import('./carrito/carritoDaoArchivo.js')
        carritoDao = new CarritoDaoArchivo();
        break
}

export { carritoDao, productosDao }