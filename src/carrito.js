const listaProductos = document.querySelector('#lista-carrito tbody')
const listaCompra = document.querySelector('#lista-compra')


export function comprarProducto(e) {
    e.preventDefault()
    if (e.target.classList.contains('agregar-carrito')) {
        const producto = e.target.parentElement.parentElement.parentElement.parentElement
        console.log(producto)
        leerDatosProducto(producto)
    }
}

function leerDatosProducto(producto) {
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('.cel').textContent,
        precio: producto.querySelector('span').textContent,
        id: producto.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    }
    let productosLS
    productosLS = obtenerProductosLocalStorage()

    productosLS.forEach(function (productoLS) {
        if (productoLS.id === infoProducto.id) {
            productosLS = productoLS.id;
        }
    })

    if (productosLS === infoProducto.id) {
        console.warn('El producto ya está (en el LS')
        Swal.fire('El producto ya fue agregado al carrito')
    } else {
        insertarCarrito(infoProducto)
    }
}

function obtenerProductosLocalStorage() {
    let productosLS
    if (localStorage.getItem('productos') === null) {
        productosLS = []
    }
    else {
        productosLS = JSON.parse(localStorage.getItem('productos'))
    }
    return productosLS
}

function insertarCarrito(producto) {
    const row = document.createElement('tr')

    row.innerHTML = `
        <td>
            <img src="${producto.imagen}" alt="${producto.titulo}" width="100">
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
        </td>
    `
    listaProductos.appendChild(row)
    guardarProductosLocalStorage(producto)
}

function guardarProductosLocalStorage(producto) {
    let productos

    productos = obtenerProductosLocalStorage()

    productos.push(producto)

    localStorage.setItem('productos', JSON.stringify(productos))

}

export function leerLocalStorage() {
    let productosLS
    productosLS = obtenerProductosLocalStorage()
    productosLS.forEach(function (producto) {
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
            <img src="${producto.imagen}" alt="${producto.titulo}" width="100">
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <a href="#" style="color: #ff0000;" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
        </td>
        `
        listaProductos.appendChild(row)
    })
}

export function eliminarProducto(e) {
    e.preventDefault()
    let producto, productoID
    if (e.target.classList.contains('borrar-producto')) {
        producto = e.target.parentElement.parentElement
        productoID = producto.querySelector('a').getAttribute('data-id')
        producto.remove()
        eliminarProductoLocalStorage(productoID)
    }
}

function eliminarProductoLocalStorage(productoID) {
    let productosLS
    productosLS = obtenerProductosLocalStorage()
    productosLS.forEach(function (productoLS, index) {
        if (productoLS.id === productoID) {
            productosLS.splice(index, 1)
        }
    })
    localStorage.setItem('productos', JSON.stringify(productosLS))
}

export function vaciarCarrito(e) {
    e.preventDefault()
    while (listaProductos.firstChild) {
        listaProductos.removeChild(listaProductos.firstChild)
    }
    vaciarLocalStorage()

    return false
}

function vaciarLocalStorage() {
    window.localStorage.clear()
}

export function procesarPedido(e) {
    e.preventDefault()
    let array = obtenerProductosLocalStorage()
    if (array.length === 0) {
        console.warn('El carrito está vacío')
        Swal.fire('El carrito esta vacio')
    } else {
        location.href = '/pages/carrito.html'
    }
}
export function leerLocalStorageCompra() {
    let productosLS
    productosLS = obtenerProductosLocalStorage()
    productosLS.forEach(function (producto) {
         const div = document.createElement('div')
         div.classList.add('row', 'py-3', 'mb-3')
         console.log(div)
         div.innerHTML = `
                  <div class="col-4 mb-1">
                    <div class="bg-image rounded">
                        <img class="w-100" src="${producto.imagen}" alt="${producto.titulo}">
                    </div>
                    </div>
                    <div class="col-6">

                    <p class="cel"><strong>${producto.titulo}</strong></p>
                    
                    <a data-id=${producto.id} class="btn-sm me-1 mb-3 borrar-producto-compra fa-solid fa-square-minus fa-2xl" style="color: #ff0000;"></a>
                    
                    </div>
                    <div class="col-2">
                    <input type="number" min="1" max="5" class="form-control text-center cantidad" placeholder="Cantidad" value="${producto.cantidad}" >
                    <p class="text-center mt-4 precio">$${producto.precio}</p>
                    </div>
         `
        listaCompra.appendChild(div)
    })
}

export const eliminarProductoCompra = (e) => {
    e.preventDefault()
    let productoID
    if ( e.target.classList.contains('borrar-producto-compra')  ) {
        e.target.parentElement.parentElement.remove()
        let producto = e.target.parentElement.parentElement
        productoID = producto.querySelector('a').getAttribute('data-id')
    }
    eliminarProductoLocalStorage(productoID)
}

export const obtenerEvento = (e) => {
    e.preventDefault()
    let id, cantidad, producto, productosLS
    if ( e.target.classList.contains('cantidad') ) {
        console.log('cambio el input')
        producto = e.target.parentElement.parentElement
        console.log(producto)
        id = producto.querySelector('a').getAttribute('data-id')
        cantidad = producto.querySelector('input').value
        let precio = producto.querySelector('.precio')
        productosLS = obtenerProductosLocalStorage()
        productosLS.forEach(function (productoLs, index) {
            if ( productoLs.id === id ) {
                productoLs.cantidad = cantidad

                let total = Number(productoLs.cantidad) * Number(productoLs.precio)
            }
        })
        localStorage.setItem('productos', JSON.stringify(productosLS))
        calcularTotal()
    }

}

export function calcularTotal() {
    let productosLS
    let total = 0, subtotal = 0, impuestos = 0
    productosLS = obtenerProductosLocalStorage()

    productosLS.forEach( productoLs => {
        let totalProducto = Number(productoLs.cantidad * productoLs.precio)
        total = total + totalProducto
    })
    impuestos = parseFloat(total * 0.18).toFixed(2)
    subtotal = parseFloat(total-impuestos).toFixed(2)

    document.querySelector('#total').textContent = total.toFixed(2)
    document.querySelector('#sub-total').textContent = subtotal
    document.querySelector('#iva').textContent = impuestos

}
