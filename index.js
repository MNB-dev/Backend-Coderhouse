class Usuario {
    constructor (nombre, apellido, mascotas, libros){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;

    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota) {
        this.mascotas.push(mascota);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(libro, autor){
        this.libros.push({ nombre: libro, autor: autor });
    }

    getBookNames() {
        let nombresDeLibros = [];
        for (let index = 0; index < this.libros.length; index++) {
            const element = this.libros[index];
            nombresDeLibros.push(element.nombre);
        }
        return nombresDeLibros;
    }
}

const usuario = new Usuario('Marlene', 'Benitez', ['Lola'], [{nombre:'GoT', autor:'GRRM'}]);
usuario.addMascota('mascota 1');
usuario.addMascota('mascota 2');
usuario.addBook('HP', 'JK Rowling');
usuario.addBook('Otro libro más','otro autor');

const libros = usuario.getBookNames();
const cantMascotas = usuario.countMascotas();
const nombreCompleto = usuario.getFullName();

console.log(`Nombre completo: ${nombreCompleto}.`);
console.log(`Cantidad de mascotas: ${cantMascotas}.`);
console.log('Libros: ');
console.log(libros);