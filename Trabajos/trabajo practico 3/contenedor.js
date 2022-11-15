const fs = require("fs");

class Contenedor {
	constructor() {
		this.archivo = "./productos.json";
	}

	getAll = async () => {
		try {
			const archivo = await fs.promises.readFile(this.archivo);
			const productos = JSON.parse(archivo);
			return productos;
		} catch (error) {
			console.log(`Ocurrio un error: ${error}`);
		}
	};

	save = async (producto) => {
		try {
			const productos = await this.getAll();
			productos.push(producto);
			await fs.promises.writeFile(this.archivo, JSON.stringify(productos));
		} catch (error) {
			console.log(error);
		}
	};

	getById = async (id) => {
		try {
			const productos = await this.getAll();
			const productoEncontrado = productos.find(
				(producto) => producto.id == id
			);

			if (!productoEncontrado)
				return console.log("El id del pruducto no existe");
			else return console.log(JSON.stringify(productoEncontrado));
		} catch (error) {
			console.log(error);
		}
	};

	deleteById = async (id) => {
		try {
			const productos = await this.getAll();
			const productoEncontrado = productos.find(
				(producto) => producto.id == id
			);

			if (!productoEncontrado)
				return console.log("El id del pruducto no existe");
			const productosFiltrados = productos.filter(
				(producto) => producto.id != id
			);

			await fs.promises.writeFile(
				this.archivo,
				JSON.stringify(productosFiltrados, null, 3)
			);

			console.log("Producto borrado");
		} catch (error) {
			console.log(error);
		}
	};

	deleteAll = async () => {
		try {
			await fs.promises.writeFile(this.archivo, JSON.stringify([], null, 3));
			console.log("Se ha borrado todo el array de productos exitosamente!");
		} catch (error) {
			console.log(error);
		}
	};
}

const contenedor = new Contenedor();

module.exports = Contenedor;
