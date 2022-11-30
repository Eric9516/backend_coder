const socket = io();

const enviar = () => {
  const msgParaEnvio = document.getElementById("inputMsg").value;
  const email = document.getElementById("input-email").value;
  socket.emit("msg", { email: email, mensaje: msgParaEnvio });
  return false;
};

socket.on("msg-list", (data) => {
  let html = "";
  data.forEach((item) => {
    html += `
        <div>
        <p>${item.timestamp} ${item.email} dice: <br> <span> ${item.mensaje}</span> </p>
        </div> 
        `;
  });
  document.getElementById("mgs-area").innerHTML = html;
});

const postProducto = () => {
  const nombre = document.getElementById("nombreProducto").value;
  const precio = document.getElementById("precioProducto").value;
  const url = document.getElementById("urlProducto").value;
  socket.emit("product", { nombre: nombre, precio: precio, image: url });
  return false;
};

socket.on("productList", (data) => {
  let html = "";
  data.forEach((item) => {
    html += `
        <div>
            <img src="${item.image}" />
            <p>Producto: ${item.nombre}</p>
            <p>Precio: $ ${item.precio}</p>
        </div>
        `;
  });
  document.getElementById("productsContainer").innerHTML = html;
});
