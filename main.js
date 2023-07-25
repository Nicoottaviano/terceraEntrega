const productos = {
	1: {
		nombre: "Remeras",
		precio: 2000,
		talla: ["S", "M", "L"],
		colores: ["rojo", "azul", "verde"]
	},
	2: {
		nombre: "Jeans",
		precio: 2500,
		talla: ["S", "M", "L"],
		colores: ["negro", "gris"]
	},
	3: {
		nombre: "Camperas",
		precio: 5000,
		talla: ["36", "37", "38", "39", "40"],
		colores: ["blanco", "negro"]
	}
};

let carrito = [];

function mostrarMenuPrendas() {
	let menu = "Menú de prendas:\n";

	for (const id in productos) {
		const producto = productos[id];
		menu += `${id}. ${producto.nombre} - Precio: $${producto.precio}\n`;
	}

	menu += "0. Salir";

	return parseInt(prompt(menu));
}

function agregarAlCarrito() {
	const idProducto = mostrarMenuPrendas();

	if (idProducto === 0) {
		alert("Gracias por utilizar nuestra tienda en línea. Esperamos que vuelvas!");
		return;
	}

	const cantidad = parseInt(prompt("¿Cuántas unidades deseas agregar al carrito?"));

	let producto = productos[idProducto];

	if (producto) {
		let item = {
			id: idProducto,
			nombre: producto.nombre,
			precio: producto.precio,
			cantidad
		};

		carrito.push(item);
		actualizarCarrito();
		alert(`Se agregaron ${cantidad} unidades de ${producto.nombre} al carrito`);
	} else {
		alert("El producto no existe");
	}
}

function eliminarDelCarrito() {
	const idProducto = prompt("Ingrese el ID del producto que quieres eliminar del carrito:");

	let index = -1;

	for (let i = 0; i < carrito.length; i++) {
		if (carrito[i].id === idProducto) {
			index = i;
			break;
		}
	}

	if (index !== -1) {
		carrito.splice(index, 1);
		actualizarCarrito();
		alert(`Se eliminó el producto con ID ${idProducto} del carrito`);
	} else {
		alert("Este producto no está en el carrito");
	}
}

function calcularTotalCarrito() {
	let total = 0;

	for (let i = 0; i < carrito.length; i++) {
		total += carrito[i].precio * carrito[i].cantidad;
	}

	alert(`El total de la compra es $${total}`);
}

function actualizarCarrito() {
	const carritoLista = document.getElementById("carrito-lista");
	carritoLista.innerHTML = "";

	for (let i = 0; i < carrito.length; i++) {
		const item = carrito[i];
		const li = document.createElement("li");
		li.textContent = `${item.nombre} - Precio: $${item.precio} - Cantidad: ${item.cantidad}`;
		carritoLista.appendChild(li);
	}

	// Guardar el carrito en el almacenamiento local (local storage)
	localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarMenu() {
	let opcion = "";

	while (opcion !== "4") {
		opcion = prompt(`Seleccione una opción:
		1. Agregar producto al carrito
		2. Eliminar producto del carrito
		3. Calcular total de la compra
		4. Salir`);

		switch (opcion) {
			case "1":
				agregarAlCarrito();
				break;
			case "2":
				eliminarDelCarrito();
				break;
			case "3":
				calcularTotalCarrito();
				break;
			case "4":
				alert("Gracias por comprar en El Cuervo, te esperamos de vuelta");
				break;
			default:
				alert("Opción inválida, selecciona una opción dentro de las indicadas");
				break;
		}
	}
}

// Recuperar el carrito del almacenamiento local (local storage) al cargar la página
const carritoLocalStorage = localStorage.getItem("carrito");
if (carritoLocalStorage) {
	carrito = JSON.parse(carritoLocalStorage);
	actualizarCarrito();
}