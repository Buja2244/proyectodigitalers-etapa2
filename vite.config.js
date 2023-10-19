import { resolve } from 'node:path'

// console.log(resolve('pages'))

export default {
    server: {
        port: "2222",
    },
    css: {
        devSourcemap: true,
    },
    build: {
        emptyOutDir: true,
        rollupOptions: {
            input: {
                carrito: resolve('pages/carrito.html'),
                contacto: resolve('pages/contacto.html'),
                nosotros: resolve('pages/nosotros.html'),
                index: resolve('index.html'),
                asus1: resolve('pages/asus-zb631.html'),
                asus2: resolve('pages/asus-zenfone-8.html'),
                asus3: resolve('pages/asus-zenfone-3-max.html'),
                lg1: resolve('pages/lgk22plus.html'),
                lg2: resolve('pages/lgk52.html'),
                lg3: resolve('pages/lgk62plus.html'),
                Moto1: resolve('pages/Motorola-E13.html'),
                Moto2: resolve('pages/MotoG42.html'),
                Moto3: resolve('pages/MotoEdge40.html'),

            }
        }
    }
}