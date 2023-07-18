function programaPrincipal() {

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

let carrito = []
let carritoJSON = JSON.parse(localStorage.getItem("carrito"))
let contenedorTarjetas = document.getElementById("productos")

if (carritoJSON) {
    carrito = carritoJSON
}

crearTarjetas(productos, contenedorTarjetas, carrito)
crearTarjetasCarrito(carrito)

let buscarProductos = document.getElementById("buscarProductos")
buscarProductos.addEventListener("input", () => filtrarPorNombre(productos, contenedorTarjetas, carrito))

let botonesCategorias = document.getElementsByClassName("filtroCategorias")
for (const botonCategorias of botonesCategorias) {
    botonCategorias.addEventListener("click", (e) => filtrarPorCategoria(e, contenedorTarjetas, carrito, productos, botonFinalizarCompra))
}

let botonCarrito = document.getElementById("botonCarrito")
botonCarrito.addEventListener("click", () => verCarrito(contenedorTarjetas, botonFinalizarCompra))

let botonVaciarCarrito = document.getElementById("botonVaciarCarrito")
botonVaciarCarrito.addEventListener("click", vaciarCarrito)

let botonFinalizarCompra = document.getElementById("finalizarCompra")
botonFinalizarCompra.addEventListener("click", vaciarCarrito)

}

programaPrincipal()



function crearTarjetas(arrayFiltrado, contenedorTarjetas, carrito) {
    contenedorTarjetas.innerHTML = ""
    arrayFiltrado.forEach (({ nombre, rutaImagen, precio, id}) => {
        let tarjeta = document.createElement("div")
        tarjeta.className = "tarjetasPetshop"
        tarjeta.innerHTML = `
            <h4>${nombre}</h4>
            <img src="./img/${rutaImagen}">
            <h4>$${precio}</h4>
            <button id=${id}>Agregar al carrito</button>
        `
        contenedorTarjetas.appendChild(tarjeta)
        let botonAgregarCarrito = document.getElementById(id)
        botonAgregarCarrito.addEventListener("click", () => agregarAlCarrito(arrayFiltrado, id, carrito))
    })
}

function filtrarPorNombre(productos, contenedorTarjetas, carrito) {
    let arrayFiltrado = productos.filter(producto => producto.nombre.toLowerCase().includes(buscarProductos.value.toLowerCase()))
    crearTarjetas(arrayFiltrado, contenedorTarjetas, carrito)
}

function filtrarPorCategoria(e, contenedorTarjetas, carrito, productos, botonFinalizarCompra) {
    ocultarCarrito(contenedorTarjetas, botonFinalizarCompra)
    if (e.target.value === "quitar") {
        crearTarjetas(productos, contenedorTarjetas, carrito)
    } else {
        let arrayFiltrado = productos.filter(producto => producto.categoria === e.target.value)
        crearTarjetas(arrayFiltrado, contenedorTarjetas, carrito)
    }
}

function verCarrito(contenedorTarjetas, botonFinalizarCompra) {
    let carrito = document.getElementById("carrito")
    contenedorTarjetas.classList.toggle("ocultar")
    carrito.classList.toggle("ocultar")
    botonFinalizarCompra.classList.toggle("ocultar")
}

function ocultarCarrito(contenedorTarjetas, botonFinalizarCompra) {
    let carrito = document.getElementById("carrito")
    contenedorTarjetas.classList.remove("ocultar")
    carrito.classList.add("ocultar")
    botonFinalizarCompra.classList.add("ocultar")
}

function agregarAlCarrito(arrayFiltrado, id, carrito) {
    console.log(id)
    let productoElegido = arrayFiltrado.find(producto => producto.id === id)
    let posPproductoEnCarrito = carrito.findIndex(producto => producto.id === productoElegido.id)
    if (posPproductoEnCarrito !== -1) {
        carrito[posPproductoEnCarrito].unidades++
        carrito[posPproductoEnCarrito].subTotal = carrito[posPproductoEnCarrito].unidades * carrito[posPproductoEnCarrito].precioUnitario
    } else {
        carrito.push({
            id: productoElegido.id,
            nombre: productoElegido.nombre,
            precioUnitario: productoElegido.precio,
            unidades: 1,
            subTotal: productoElegido.precio
        })
    }
    crearTarjetasCarrito(carrito)
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function crearTarjetasCarrito(carrito) {
    let total = 0
    let crearEnCarrito = document.getElementById("carrito")
    crearEnCarrito.innerHTML = ""
    total = carrito.reduce((acumulador, producto) => acumulador + producto.subTotal, 0)
    carrito.forEach(producto => {
        crearEnCarrito.innerHTML += `
        <p>${producto.nombre} | $${producto.precioUnitario} | Unidades ${producto.unidades} | Subtotal $${producto.subTotal}\n</p>
        `
    })
    crearEnCarrito.innerHTML += `
        <p>Su total a pagar es $${total}</p>
        `
}

function vaciarCarrito() {
    carrito = []
    localStorage.removeItem("carrito")
    crearTarjetasCarrito(carrito)
}
