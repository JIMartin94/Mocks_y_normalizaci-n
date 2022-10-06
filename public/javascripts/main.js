const socket = io.connect();

const render = (data)=>{
    const html = data.map((elemento,index)=>{
        return(
            `<div>
            <strong id="mail">${elemento.id } | </strong>:
                <strong id="tfecha">${elemento.date} | </strong>:
                <strong id="tautor">${elemento.alias}</strong>:
                <em id="ttexto">${elemento.text}</em>
            </div>
            `)
    }).join(" ")
    document.getElementById("messages").innerHTML = html;
}

const renderProducts = (data)=>{
    const html = data.map((elemento,index)=>{
        return(
            `<tr>
                <td>${elemento.title}</td>
                <td>$ ${elemento.price}</td>
                <td><img style="width: 200px" src="${elemento.thumbnail}" ></td>
                <td><a href="/productos/detalle/${elemento.id}" type="button" class="btn btn-warning">Ver detalle</a></td>   
            </tr> 
            `)
    }).join(" ")
    document.getElementById("products").innerHTML = html;
}

const addMessage = (e)=>{
    let mensaje = {
        id: document.getElementById("mail").value,
        nombre: document.getElementById("nombre").value,
        apellido: document.getElementById("apellido").value,
        edad: document.getElementById("edad").value,
        alias: document.getElementById("alias").value,
        avatar: document.getElementById("avatar").value,
        text: document.getElementById("texto").value,
        date:  new Date().toLocaleString()
    }
    document.getElementById("texto").value = ' ';
    socket.emit('new-message',mensaje);
    return false;
}

// const addProduct = (e)=>{
//     let product = {
//         title: document.getElementById("title").value,
//         price: document.getElementById("price").value,
//         thumbnail: document.getElementById("thumbnail").value
//     }
//     let form =  document.getElementById("formp");
//     form.reset();
//     socket.emit('new-product',product);
//     return false;
// }

socket.on('messages',(data)=>{render(data)});
socket.on('productos',(data)=>{renderProducts(data)});