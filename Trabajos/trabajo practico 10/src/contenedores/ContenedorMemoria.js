class ContenedorMemoria {
    constructor() {
        this.listProducts = [
            {
                id: 1,
                precio: 10000,
                nombre: "Pelota",
                foto: "https://media.tycsports.com/files/2022/03/31/409274/al-rihla_w416.jpg",
                codigo: 1001,
                timestamp: "25 / 12 / 2022, 9:53:47",
                stock: 15,
                descripcion: "Pelota mundial 2022",
            },
            {
                id: 2,
                timestamp: "25 / 12 / 2022, 9:53:10",
                nombre: "Botines",
                stock: 10,
                codigo: "1002",
                precio: 15000,
                foto: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/009/339/products/11-9…",
                descripcion: "Botines adidas",
            },
        ];
        this.listCarts = [
            {
                id: 1,
                timestampCarrito: "22 / 11 / 2022, 11:26:32",
                productos: [
                    {
                        id: 2,
                        timestamp: "25 / 12 / 2022, 9:53:10",
                        nombre: "Botines",
                        stock: 10,
                        codigo: "1002",
                        precio: 15000,
                        foto: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/009/339/products/11-9…",
                        descripcion: "Botines adidas",
                    },
                ],
            },
            {
                id: 2,
                timestampCarrito: "22 / 11 / 2022, 11:48:22",
                productos: [
                    {
                        id: 1,
                        precio: 10000,
                        nombre: "Pelota",
                        foto: "https://media.tycsports.com/files/2022/03/31/409274/al-rihla_w416.jpg",
                        codigo: 1001,
                        timestamp: "25 / 12 / 2022, 9:53:47",
                        stock: 15,
                        descripcion: "Pelota mundial 2022",
                    },
                ],
            },
        ];
    }

    getAll(list) {
        if (list == "productos") {
            return this.listProducts;
        } else if (list == "carritos") {
            return this.listCarts;
        } else {
            return "No existe la lista";
        }
    }

    getById(num, list) {
        try {
            let lista;
            if (list == "productos") {
                lista = this.listProducts;
            } else if (list == "carritos") {
                lista = this.listCarts;
            } else {
                return "No existe la lista";
            }
            const index = lista.findIndex((object) => object.id == num);
            if (lista[index]) {
                return lista[index];
            } else {
                return "No existe el número de id elegido";
            }
        } catch (e) {
            console.log(e);
            return "Se ha producido un error";
        }
    }

    async save(timestamp, nombre, descripcion, codigo, foto, precio, stock) {
        try {
            const lista = this.listProducts;
            let highestid = Math.max(...lista.map((el) => el.id));
            let id = highestid + 1;
            let productoNuevo = {
                id: id,
                timestamp: timestamp,
                nombre: nombre,
                descripcion: descripcion,
                codigo: codigo,
                foto: foto,
                precio: precio,
                stock: stock,
            };
            this.listProducts.push(productoNuevo);
            return id;
        } catch {
            console.log("Se ha producido un error");
            return "Se ha producido un error";
        }
    }

    async replace(num, timestamp, nombre, descripcion, codigo, foto, precio, stock) {
        try {
            const lista = this.listProducts;
            const index = lista.findIndex((object) => object.id == num);
            if (lista[index]) {
                const productoNuevo = {
                    id: num,
                    timestamp: timestamp,
                    nombre: nombre,
                    descripcion: descripcion,
                    codigo: codigo,
                    foto: foto,
                    precio: precio,
                    stock: stock,
                };
                this.listProducts[index] = productoNuevo;
                return `Se actualizó el producto ${productoNuevo.nombre}`;
            } else {
                return "No existe el número de id elegido";
            }
        } catch {
            console.log("Se ha producido un error");
            return "Se ha producido un error";
        }
    }

    async deleteById(num, list) {
        try {
            let lista;
            if (list == "productos") {
                lista = this.listProducts;
            } else if (list == "carritos") {
                lista = this.listCarts;
            } else {
                return "No existe la lista";
            }
            const index = lista.findIndex((object) => object.id == num);
            if (lista[index]) {
                if (list == "productos") {
                    this.listProducts.splice(index, 1);
                    return `Se eliminó con exito`;
                } else if (list == "carritos") {
                    this.listCarts.splice(index, 1);
                    return `Se eliminó con exito`;
                }
            } else {
                return "No existe el número de id elegido";
            }
        } catch {
            console.log("Se ha producido un error");
            return "Se ha producido un error";
        }
    }

    async addCart(timestampCarrito) {
        try {
            const lista = this.listCarts;
            let idCarrito;
            if (lista.length > 0) {
                let highestid = Math.max(...lista.map((el) => el.id));
                idCarrito = highestid + 1;
            } else {
                idCarrito = 1;
            }

            let carritoNuevo = {
                id: idCarrito,
                timestampCarrito: timestampCarrito,
                productos: [],
            };
            this.listCarts.push(carritoNuevo);
            return idCarrito;
        } catch {
            console.log("Se ha producido un error");
            return "Se ha producido un error";
        }
    }

    getProductsFromCart(num) {
        try {
            const lista = this.listCarts;
            const index = lista.findIndex((object) => object.id == num);
            if (lista[index]) {
                return lista[index].productos;
            } else {
                return "No existe el número de id elegido";
            }
        } catch {
            console.log("Se ha producido un error");
            return "Se ha producido un error";
        }
    }

    async addProductToCart(num, producto) {
        const lista = this.listCarts;
        const index = lista.findIndex((object) => object.id == num);
        lista[index].productos.push(producto);
    }

    async deleteProductFromCart(num, id_prod) {
        const lista = this.listCarts;
        const index = lista.findIndex((object) => object.id == num);
        const indexProduct = lista[index].productos.findIndex((object) => object.id == id_prod);
        this.listCarts[index].productos.splice(indexProduct, 1);
    }
}

export default ContenedorMemoria;
