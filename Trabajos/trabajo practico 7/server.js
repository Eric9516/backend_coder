const express = require("express");
const { Router } = express;
const routerProducts = Router();
const routerCart = Router();
const app = express();
const Container = require("./containers/productContainer");
const container = new Container();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
	console.log(`Servidor http escuchando en el puerto http://localhost:${PORT}`);
});

app.set("view engine", "ejs");

app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/products", routerProducts);
app.use("/api/cart", routerCart);

app.get("/", (req, res) => {
	res.render("pages/inicio");
});

app.get("/form", (req, res) => {
	res.render("pages/form");
});

app.get("/modify", (req, res) => {
	res.render("pages/modify");
});

routerProducts.get("/", async (req, res) => {
	const productList = await container.getAll();
	res.render("pages/products", { products: productList });
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

routerProducts.post("/", async (req, res) => {
	const body = req.body;
	try {
		const newProduct = await container.save(body);
		res.render("pages/form");
	} catch (error) {
		console.log(error);
	}
});

routerProducts.put("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const { title, price, thumbnail } = req.body;
		await container.updateById(id, title, price, thumbnail);
		res.json("El producto se actualizo correctamente");
	} catch (error) {
		res.json({ error: "Producto no encontrado" });
	}
});

routerProducts.delete("/:id", async (req, res) => {
	const { id } = req.params;
	await container.deleteById(id);
	res.json("Producto borrado");
});

//Carrito-------------------------------------------------------
const cartContainer = require("./containers/cartContainer");
const cartCont = new cartContainer();

routerCart.get("/", async (req, res) => {
	const cartList = await cartCont.getAll();
	res.render("pages/cart", { product: cartList });
});

routerCart.get("/:id", async (req, res) => {
	const { id } = req.params;
	const product = await cartCont.getById(id);
	if (product) {
		res.send({ success: true, product: product });
	} else {
		res.json({ error: true, msj: "id no encontrado" });
	}
});

routerCart.post("/", async (req, res) => {
	const body = req.body;
	try {
		const newProduct = await cartCont.save(body);
		res.render("pages/products");
	} catch (error) {
		console.log(error);
	}
});

routerCart.put("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const { title, price, thumbnail } = req.body;
		await cartCont.updateById(id, title, price, thumbnail);
		res.json("El producto se actualizo correctamente");
	} catch (error) {
		res.json({ error: "Producto no encontrado" });
	}
});

routerCart.delete("/:id", async (req, res) => {
	const { id } = req.params;
	await cartCont.deleteById(id);
	res.json("Producto borrado");
});
