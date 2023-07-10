let productos = [
    { id: 3, nombre: "alimento de gato x 1kg", categoria: "alimentos", stock: 9, precio: 1000, rutaImagen: "alimento-gato.webp" },
    { id: 5, nombre: "alimento de perro x 1kg", categoria: "alimentos", stock: 7, precio: 1300, rutaImagen: "alimento-perro.webp" },
    { id: 6, nombre: "collar de gato", categoria: "accesorios", stock: 2, precio: 700, rutaImagen: "collar-gato.webp" },
    { id: 8, nombre: "collar de perro", categoria: "accesorios", stock: 1, precio: 900, rutaImagen: "collar-perro.webp" },
    { id: 11, nombre: "piedras sanitarias x 1kg", categoria: "higiene", stock: 5, precio: 400, rutaImagen: "piedras-sanitarias.webp" },
    { id: 13, nombre: "ratón de plástico", categoria: "juguetes", stock: 4, precio: 400, rutaImagen: "ratas-panio.webp" },
    { id: 15, nombre: "pelota de tenis", categoria: "juguetes", stock: 6, precio: 500, rutaImagen: "pelota-tenis.webp" },
    { id: 17, nombre: "hueso de cuero", categoria: "juguetes", stock: 5, precio: 600, rutaImagen: "hueso-cuero.webp" },
    { id: 19, nombre: "rascador para gatos", categoria: "juguetes", stock: 2, precio: 1800, rutaImagen: "rascador-gatos.webp" },
]

let contenedorTarjetas = document.getElementById("productos")

crearTarjetas(productos)

function crearTarjetas(array) {
    contenedorTarjetas.innerHTML = ""
    for (const producto of array) {
        let tarjeta = document.createElement("div")
        tarjeta.className = "tarjetasPetshop"
        tarjeta.innerHTML = `
            <h4>${producto.nombre}</h4>
            <img src="./img/${producto.rutaImagen}">
            <h4>$${producto.precio}</h4>
            <button id=${producto.id}>Agregar al carrito</button>
        `
        contenedorTarjetas.appendChild(tarjeta)
    }
}

let buscarProductos = document.getElementById("buscarProductos")
buscarProductos.addEventListener("input", filtrarPorNombre)

let botonesCategorias = document.getElementsByClassName("filtroCategorias")
for (const botonCategorias of botonesCategorias) {
    botonCategorias.addEventListener("click", filtrarPorCategoria)
}

function filtrarPorNombre() {
    let arrayFiltrado = productos.filter(producto => producto.nombre.toLowerCase().includes(buscarProductos.value.toLowerCase()))
    crearTarjetas(arrayFiltrado)
}

function filtrarPorCategoria(e) {
    if (e.target.value === "quitar") {
        crearTarjetas(productos)
    } else {
        let arrayFiltrado = productos.filter(producto => producto.categoria === e.target.value)
        console.dir(e.target)
        crearTarjetas(arrayFiltrado)
    }
}

function agregarAlCarrito() {
    
}

