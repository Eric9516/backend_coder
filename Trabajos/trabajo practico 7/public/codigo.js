const div = document.getElementById("search");
const btn_enviar = document.getElementById("submit");

//Obtener producto con ID
btn_enviar.addEventListener("click", () => {
	const id = document.getElementById("id").value;
	fetch(`http://localhost:8080/api/products/${+id}`)
		.then((res) => res.json())
		.then((res) => {
			if (res.product) {
				return (div.innerHTML = `
				<p>${res.product.title}</p>
				<p>${res.product.price}</p>
				<p>${res.product.id}</p>
				<img src="${res.product.thumbnail}"/>
				`);
			} else if (res.error === true) {
				return (div.innerHTML = `<p>El id ${id} no pertenece a ningun producto</p>`);
			}
		});
});

//________________________________________________________

//Borrar producto con ID
const btn_delete = document.getElementById("delete");

btn_delete.addEventListener("click", () => {
	const del = document.getElementById("deleteInput").value;
	fetch(`http://localhost:8080/api/products/${+del}`, {
		method: "DELETE",
	})
		.then((res) => res.json())
		.then((res) => console.log(`${res} was deleted`));
	window.location.reload();
});

//________________________________________________________

//Modificar archivo agregado
// const btn_modify = document.getElementById("botonModificar");
// btn_modify.addEventListener("click", () => {
// 	const idMod = document.getElementById("id_modify").value;
// 	const title = document.getElementById("modify_title").value;
// 	const price = document.getElementById("modify_price").value;
// 	const thumbnail = document.getElementById("modify_thumbnail").value;
// 	fetch(`http://localhost:8080/api/products/${+idMod}`, {
// 		method: "PUT",
// 		body: JSON.stringify({ title: title, price: price, thumbnail: thumbnail }),
// 	})
// 		.then((res) => res.json())
// 		.then((res) => {
// 			console.log(res);
// 		});
// });

//--------------------------------------------------------
