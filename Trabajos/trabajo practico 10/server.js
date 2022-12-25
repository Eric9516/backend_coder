import express from "express";
import routerCarrito from "./routes/routerCarritos.js";
import routerProductos from "./routes/routerProductos.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

app.listen(PORT, () => console.log(`Escuchando en el puerto http://localhost:${PORT} `));

app.get("/", (req, res) => {
    res.send(`
		<h2>Bienvenidos a nuestra tienda virtual!!</h2> \n 
		<a href="/api/productos">Lista de productos</a>
		<br><br>
		<a href="/api/carrito">Carrito</a>
		`);
});

app.get("/*", (req, res) => {
    res.json({ error: true, descripcion: "ruta no encontrada" });
});
