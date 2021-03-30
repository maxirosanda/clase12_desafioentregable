const socket = io(); // Ya podemos empezar a usar los sockets desde el cliente :)

 
const enviarMensaje = () =>{
    let paquete = { mail: document.getElementById("mail").value,
     mensaje: document.getElementById("mensaje").value,
     fecha: "18/07/1987"
}
    socket.emit('paquete', paquete)
} 
socket.on('vermensajes', data => {
    let texto =""
    data.forEach((el,index) =>{
      texto += `<h3>socket : ${el.mail} mensaje ${el.mensaje} fecha ${el.fecha} </h3><br>`    
   })
   document.getElementById("contenedordatos").innerHTML=texto
})







