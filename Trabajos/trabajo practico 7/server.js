const express = require("express");
const { Router } = express;
const routerProducts = Router();
const routerCart = Router();
const app = express();
const Container = require("./containers/productContainer");
const container = new Container();
const PORT = process.env.PORT || 8080;
const administrador = true;

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

routerProducts.post(
	"/",
	(admin = (req, res, next) => {
		if (administrador) {
			res.send("Acceso permitido");
			next();
		} else {
			res.send("acceso denegado");
		}
	}),
	async (req, res) => {
		const body = req.body;
		try {
			const newProduct = await container.save(body);
			res.json({ success: true, msj: "Producto agregado correctamente" });
		} catch (error) {
			console.log(error);
		}
	}
);

routerProducts.put(
	"/:id",
	(admin = (req, res, next) => {
		if (administrador) {
			res.send("Acceso permitido");
			next();
		} else {
			res.send("acceso denegado");
		}
	}),
	async (req, res) => {
		try {
			const id = req.params.id;
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
		} catch (error) {
			res.json({ error: "Producto no encontrado" });
		}
	}
);

routerProducts.delete(
	"/:id",
	(admin = (req, res, next) => {
		if (administrador) {
			res.send("Acceso permitido");
			next();
		} else {
			res.send("acceso denegado");
		}
	}),
	async (req, res) => {
		const { id } = req.params;
		await container.deleteById(id);
		res.json("Producto borrado");
	}
);

//Carrito-------------------------------------------------------

const cartContainer = require("./containers/cartContainer");
const cartCont = new cartContainer();

routerCart.get("/", async (req, res) => {
	const cartList = await cartCont.getAll();
	cartList.length > 0
		? res.json(cartList)
		: res.json({ error: true, msj: "Carrito vacío" });
});

routerCart.get("/:id/productos", async (req, res) => {
	const { id } = req.params;
	const product = await cartCont.getById(id);
	product
		? res.json(product)
		: res.json({ error: true, msj: "id no encontrado" });
});

routerCart.post(
	"/",
	(admin = (req, res, next) => {
		if (administrador) {
			res.send("Acceso permitido");
			next();
		} else {
			res.send("acceso denegado");
		}
	}),
	async (req, res) => {
		const body = req.body;
		console.log(body);
		try {
			const newProduct = await cartCont.save(body);
			res.json({ success: true, msj: "Producto agregado al carrito" });
		} catch (error) {
			res.json({ error: true, msj: error });
		}
	}
);

routerCart.post("/:id/productos", async (req, res) => {
	const { id } = req.params;
	const productoPedido = await container.getById(+id);
	const body = productoPedido;
	await cartCont.save(body);
	res.json(productoPedido);
});

routerCart.put(
	"/:id",
	(admin = (req, res, next) => {
		if (administrador) {
			res.send("Acceso permitido");
			next();
		} else {
			res.send("acceso denegado");
		}
	}),
	async (req, res) => {
		try {
			const id = req.params.id;
			const { title, price, thumbnail } = req.body;
			await cartCont.updateById(id, title, price, thumbnail);
			res.send("El producto se actualizo correctamente");
		} catch (error) {
			res.json({ error: true, msj: error });
		}
	}
);

routerCart.delete(
	"/:id",
	(admin = (req, res, next) => {
		if (administrador) {
			res.send("Acceso permitido");
			next();
		} else {
			res.send("acceso denegado");
		}
	}),
	async (req, res) => {
		const { id } = req.params;
		await cartCont.deleteById(id);
		res.json("Producto borrado");
	}
);
