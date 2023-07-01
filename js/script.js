let productos = [
    { id: 3, nombre: "Alimento de gato x 1kg", categoria: "alimento", stock: 9, precio: 1000 , rutaImagen: "alimento-gato.webp" },
    { id: 5, nombre: "Alimento de perro x 1kg", categoria: "alimento", stock: 7, precio: 1300 , rutaImagen: "alimento-perro.webp" },
    { id: 6, nombre: "Collar de gato", categoria: "accesorios", stock: 2, precio: 700 , rutaImagen: "collar-gato.webp" },
    { id: 8, nombre: "Collar de perro", categoria: "accesorios", stock: 1, precio: 900 , rutaImagen: "collar-perro.webp" },
    { id: 11, nombre: "Piedras sanitarias x 1kg", categoria: "higiene", stock: 5,  precio: 400 , rutaImagen: "piedras-sanitarias.webp" },
    { id: 13, nombre: "Ratón de plástico", categoria: "juguetes", stock: 4, precio: 400 , rutaImagen: "ratas-panio.webp" },
    { id: 15, nombre: "Pelota de tenis", categoria: "juguetes", stock: 6, precio: 500 , rutaImagen: "pelota-tenis.webp" },
    { id: 17, nombre: "Hueso de cuero", categoria: "juguetes", stock: 5, precio: 600 , rutaImagen: "hueso-cuero.webp" },
    { id: 19, nombre: "Rascador para gatos", categoria: "juguetes", stock: 2, precio: 1800 , rutaImagen: "rascador-gatos.webp" },
]

let contenedorTarjetas = document.getElementById("productos")

crearTarjetas(productos, contenedorTarjetas)

function crearTarjetas(array, contenedor) {
    for (const producto of productos) {
        let tarjeta = document.createElement("div")
        tarjeta.className = "tarjetasPetshop"
        tarjeta.innerHTML = `
            <h4>${producto.nombre}</h4>
            <img src="./img/${producto.rutaImagen}">
            <h4>$${producto.precio}</h4>
        `
        contenedor.appendChild(tarjeta)
    }
}
