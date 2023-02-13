import ContenedorArchivo from "../../contenedores/ContenedorArchivo.js";

class CarritosDaoArchivo extends ContenedorArchivo {
    constructor(){
        super("./src/db/carrito.json")
    }
}

export default CarritosDaoArchivo;