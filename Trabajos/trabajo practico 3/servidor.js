const express = require("express");
const Contenedor = require("./contenedor");
const app = express();
const PORT = process.env.PORT || 8080;

const productos = new Contenedor();

app.get("/", (req, res) => {
	res.send("Bienvenidos a nuestra tienda online");
});

app.get("/productos", (req, res) => {
	productos.getAll().then((listaProductos) => {
		res.json(listaProductos);
	});
});

app.get("/productoRandom", (req, res) => {
	productos
		.getAll()
		.then(
			(listaProductos) =>
				listaProductos[Math.floor(Math.random() * listaProductos.length)]
		)
		.then((item) => res.json(item));
});

app.listen(PORT, () => {
	console.log(`Example app listening on port http://localhost:${PORT}`);
});
