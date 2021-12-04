import ContenedorArchivo from "../../services/Productos/ServiceProductoArchivo"

class ProductosDaoArchivo extends ContenedorArchivo {

    constructor(rutaDir) {
        super(`${rutaDir}/productos.json`)
    }
}

export default ProductosDaoArchivo
