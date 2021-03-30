const socket = io(); // Ya podemos empezar a usar los sockets desde el cliente :)
 const enviarCaracter = (e) =>{
     socket.emit('ingreso caracter', e.value)
 }
 const enviarFrase = () =>{
    let frase = document.getElementById("frase").value
    socket.emit('frase', frase)
} 
socket.on('frases', data => {
    let texto =""
    data.map(el =>{
        texto += `<h3>socket : ${el.socketid} mensaje ${el.mensaje}</h3><br>`    
   })
   document.getElementById("contenedorfraces").innerHTML=texto
})






