//import ContenedorArchivo from "../../contenedores/ContenedorFirebase.js"

class ProductosDaoFirebase {

    constructor(rutaDir) {
        super(`${rutaDir}/personas.json`)
    }
}

export default ProductosDaoFirebase