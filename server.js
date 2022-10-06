const {Server:HttpServer} = require('http');
const {Server:iOServer} = require('socket.io');
const app = require('./app.js');
const Contenedor = require("./contenedor")

const httpServer = new HttpServer(app);
const io = new iOServer(httpServer)

const { faker } = require('@faker-js/faker');
faker.locale = 'es'
const {normalize, denormalize,schema} = require("normalizr")

let messages = new Contenedor('./mensajes.txt');

let id = 1
function getNextId() {
    return id++
}

function crearCombinacionAlAzar(id) {
    return {
        id,
        title: faker.commerce.product(),
        price: faker.commerce.price(100),
        thumbnail: faker.image.sports()
    }
}

function generarNPersonas(cant) {
    const personas = []
    for (let i = 0; i < cant; i++) {
        personas.push(crearCombinacionAlAzar(getNextId()))
    }
    return personas
}

const PORT = 8080;

const server = httpServer.listen(PORT,()=>{
console.log(`Servidor escuchando por el puerto ${PORT}`);
})
server.on("error",err=>console.log(`Error en el servidor: ${err}`))


io.on('connection',(socket)=>{
    console.log('se conecto un cliente');

    //obtener todo los mensajes
    let mensajes = messages.getAll();

    mensajes.then(m=>{
        socket.emit('messages',m)
    }).catch(error=>{
        console.log(error);
    })

    //obtener todo los produstos
    let prod = generarNPersonas(5);
        socket.emit('productos',prod)

    socket.on('new-message',async(data)=>{
        await messages.save(data);
        let mens = messages.getAll()
        mens.then(d=>{
            io.sockets.emit('messages',d)
        }) 
    })  
    
    // socket.on('new-product',async(data)=>{
    //     await products.save(data);
    //     let p = products.getAll()
    //     p.then(d=>{
    //         io.sockets.emit('productos',d)
    //     }) 
    // }) 
});