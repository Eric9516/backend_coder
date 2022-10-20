const fs = require("fs");

class Contenedor {
	constructor(nombre) {
		this.nombre = nombre;
		fs.promises.writeFile(`${nombre}.json`, "[]", (err) => {
			if (err) throw err;
		});
	}
	getAll = async () => {
		try {
			const data = await fs.promises.readFile(`${this.nombre}.json`, "utf-8");
			const productos = JSON.parse(data);
			return productos;
		} catch (error) {
			console.log(error);
		}
	};
	save = async (nuevoProducto) => {
		try {
			const productos = await this.getAll();
			const id = productos.length + 1;
			nuevoProducto.id = id;
			productos.push(nuevoProducto);
			let listaProductos = JSON.stringify(productos);
			await fs.promises.writeFile(`${this.nombre}.json`, listaProductos);
		} catch (error) {
			console.log(error);
		}
	};
	getById = async (id) => {
		try {
			const datosArray = await fs.promises.readFile(
				`${this.nombre}.json`,
				"utf-8"
			);
			const newData = JSON.parse(datosArray);
			const nombre = newData.find((nombre) => nombre.id == id);
			if (nombre) {
				return console.log(nombre);
			} else {
				console.log("Producto no encontrado");
			}
		} catch (error) {
			console.log(error);
		}
	};
	deleteById = async (id) => {
		try {
			const readData = await fs.promises.readFile(
				`${this.nombre}.json`,
				"utf-8"
			);
			const newData = JSON.parse(readData);
			const title = newData.find((nombre) => nombre.id == id);
			if (!title) {
				console.log("El ID no existe");
			} else {
				const filteredData = newData.filter((e) => e.id != id);
				const dataJSON = JSON.stringify(filteredData);
				await fs.promises.writeFile(`${this.nombre}.json`, dataJSON);

				console.log("Producto eliminado");
			}
		} catch (e) {
			console.log(e);
		}
	};
	deleteAll = async () => {
		try {
			await fs.promises.writeFile(`${this.nombre}.json`, JSON.stringify([]));
			console.log("Todos los productos fueron eliminados");
		} catch (e) {
			console.log(e);
		}
	};
}

const start = async () => {
	const producto = new Contenedor("products");
	await producto.save({ nombre: "Coca-Cola" });
	await producto.save({ nombre: "Papitas" });
	await producto.getById(1);
	await producto.getById(2);
	await producto.getById(3);
	await producto.deleteById(2);
	await producto.deleteById(3);
	//await producto.deleteAll();
};

start();
