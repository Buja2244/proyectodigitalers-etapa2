/* Librerías */
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


/* Archivos de proyecto */
import './css/style.css'
import { calcularTotal, comprarProducto, eliminarProducto, eliminarProductoCompra, leerLocalStorage, leerLocalStorageCompra, obtenerEvento, procesarPedido, vaciarCarrito } from './src/carrito'

const productos = document.getElementById('producto-individual')

const carrito = document.getElementById('carrito')

const carritoCompra = document.getElementById('lista-compra')
cargarEventos()

function cargarEventos() {

    const ruta = String(location.href)
    console.log(ruta)
    
    if ( ruta.includes('carrito.html') ) {
        esCarrito()
    } else if (ruta.includes('index.html')) {
        pagCompra()
    } else if (ruta.includes('contacto.html')) {
        pagCompra()
    } else if (ruta.includes('nosotros.html')) {
        pagCompra()
    } else {
        productos.addEventListener('click', (e) => comprarProducto(e))
        pagCompra()
    }

}

function pagCompra() {
    const vaciarCarritoBtn = carrito.querySelector('#vaciar-carrito')
    const procesarPedidoBtn = carrito.querySelector('#procesar-pedido')
    console.log(vaciarCarritoBtn, procesarPedidoBtn)

    document.addEventListener('DOMContentLoaded', leerLocalStorage())

    carrito.addEventListener('click', e => eliminarProducto(e))

    vaciarCarritoBtn.addEventListener('click', e => vaciarCarrito(e))

    procesarPedidoBtn.addEventListener('click', e => procesarPedido(e))
}

function esCarrito() {
    document.addEventListener('DOMContentLoaded', leerLocalStorageCompra())

    carritoCompra.addEventListener('click', e => eliminarProductoCompra(e))

    calcularTotal()

    carritoCompra.addEventListener('change', e => obtenerEvento(e))

    carritoCompra.addEventListener('keyup', e => obtenerEvento(e))
}