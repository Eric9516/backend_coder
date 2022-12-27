const express = require("express");
const { Router } = express;
const routerProductos = Router();
const app = express();
const port = process.env.port || 8080;
const Contenedor = require("./contenedor");
const productos = new Contenedor();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Servidor app escuchando en el puerto http://localhost:${port}`);
});

app.use("/api/productos", routerProductos);
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.send(`
		<h2>Desafio 4</h2> \n 
		<a href="/api/productos">Lista de productos</a>
		<br><br>
		<a href="/public/index.html">Formulario de carga</a>
		`);
});

routerProductos.get("/", async (req, res) => {
    const data = await productos.getAll();
    if (data) {
        res.send(data);
    } else {
        return console.log({ error: true });
    }
});

routerProductos.get("/:id", async (req, res) => {
    const { id } = req.params;
    const product = await productos.getById(id);
    if (product) {
        res.send({ success: true, product: product });
    } else {
        res.json({ error: true, msj: "Id no encontrado" });
    }
});

routerProductos.post("/", async (req, res) => {
    const { body } = req;
    try {
        productos.save(body);
        res.send({ success: true, msj: "Producto guardado" });
    } catch {
        res.json({ error: true, msj: "No se pudo guardar" });
    }
});

routerProductos.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { title, price, thumbnail } = req.body;
        await productos.updateById(id, title, price, thumbnail);
        res.json("El producto se actualizo correctamente");
    } catch (error) {
        res.json({ error: "Producto no encontrado" });
    }
});

routerProductos.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await productos.deleteById(id);
    res.json("Producto borrado");
});
