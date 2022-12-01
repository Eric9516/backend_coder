const express = require("express");
const { Router } = express;
const routerProducts = Router();
const routerCart = Router();
const app = express();
const Container = require("./containers/productContainer");
const container = new Container();
const PORT = process.env.PORT || 8080;
const verificacion = require("./config/midleware.js");

const server = app.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto http://localhost:${PORT}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/productos", routerProducts);
app.use("/api/carrito", routerCart);

app.get("/", (req, res) => {
	res.send(
		"Indique api/productos para ver la lista de productos o api/carrito para ver los productos del carrito"
	);
});

routerProducts.get("/", async (req, res) => {
	const productList = await container.getAll();
	productList.length > 0
		? res.json(productList)
		: res.json({ error: true, msj: "No hay productos cargados" });
});

routerProducts.get("/:id", async (req, res) => {
	const { id } = req.params;
	const product = await container.getById(id);
	if (product) {
		res.send({ success: true, product: product });
	} else {
		res.json({ error: true, msj: "id no encontrado" });
	}
});

routerProducts.post("/", verificacion, async (req, res) => {
	const body = req.body;
	try {
		const newProduct = await container.save(body);
		res.json({ success: true, msj: "Producto agregado correctamente" });
	} catch (error) {
		console.log(error);
	}
});

routerProducts.put("/:id", verificacion, async (req, res) => {
	try {
		const id = req.params.id;
		const productos = await container.getAll();
		const productoEncontrado = await productos.find((e) => e.id == id);
		if (productoEncontrado) {
			const { timestramp, nombre, descripcion, codigo, foto, precio, stock } =
				req.body;
			await container.updateById(
				id,
				timestramp,
				nombre,
				descripcion,
				codigo,
				foto,
				precio,
				stock
			);
			res.json("El producto se actualizo correctamente");
		} else {
			res.json({
				error: true,
				msj: "No existe un producto con el ID ingresado",
			});
		}
	} catch (error) {
		console.log(error);
	}
});

routerProducts.delete("/:id", verificacion, async (req, res) => {
	try {
		const { id } = req.params;
		const productos = await container.getAll();
		const productoEncontrado = await productos.find((e) => e.id == id);
		if (productoEncontrado) {
			await container.deleteById(id);
			res.json("Producto borrado");
		} else {
			res.json({
				error: true,
				msj: "No existe un producto con el ID ingresado",
			});
		}
	} catch (error) {
		console.log(error);
	}
});

//Carrito-------------------------------------------------------

const cartContainer = require("./containers/cartContainer");
const cartCont = new cartContainer();
const Cart = require("./containers/cart.js");

routerCart.get("/", async (req, res) => {
	try {
		const cartList = await cartCont.getAll();
		res.json({ cartList });
	} catch (error) {
		res.json({ error: true, msj: error });
	}
});

routerCart.get("/:id/productos", async (req, res) => {
	const { id } = req.params;
	const product = await cartCont.getById(id);
	product
		? res.json({ success: true, product })
		: res.json({ error: true, msj: "id no encontrado" });
});

routerCart.post("/", verificacion, async (req, res) => {
	const cart = new Cart();
	cartCont.save(cart);
	res.json({ msj: "Carrito creado" });
});

routerCart.post("/:id/productos/:id_prod", verificacion, async (req, res) => {
	try {
		const { id, id_prod } = req.params;
		const productoPedido = await container.getById(+id_prod);
		const carritos = await cartCont.getAll();
		const carritoSeleccionado = carritos.find((item) => item.id == id);
		const nuevoProducto = [...carritoSeleccionado.productos, productoPedido];
		cartCont.updateCartById(
			carritoSeleccionado.id,
			carritoSeleccionado.timestamp,
			nuevoProducto
		);
		res.json({ success: true, msj: "Producto agregado al carrito" });
	} catch (error) {
		console.log(error);
	}
});

routerCart.delete("/:id", verificacion, async (req, res) => {
	const { id } = req.params;
	const productos = await cartCont.getAll();
	const productoEncontrado = await productos.find((e) => e.id == id);
	if (productoEncontrado == undefined) {
		res.json({ error: true, msj: "Carrito no encontrado" });
	} else {
		await cartCont.deleteById(id);
		res.json({ succes: true, msj: "Carrito eliminado correctamente" });
	}
});

routerCart.delete("/:id/productos/:id_prod", async (req, res) => {
	const { id, id_prod } = req.params;

	const productos = await cartCont.getAll();
	const productoEncontrado = await productos.find((e) => e.id == id);
	const cart = await cartCont.getById(+id);
	const elementIndex = cart.productos.findIndex((el) => el.id == +id_prod);
	if (elementIndex !== -1) {
		cart.productos.splice(elementIndex, 1);
		const carritoActual = await cartCont.updateCartById(
			id,
			cart.timestamp,
			cart.productos
		);
		res.json({ success: true, msj: "Producto eliminado correctamente" });
	} else {
		res.json({ error: true, msj: "ID de producto no encontrado" });
	}
});
