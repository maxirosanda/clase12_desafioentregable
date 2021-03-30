const socket = io(); // Ya podemos empezar a usar los sockets desde el cliente :)
const fecha = new Date();

const enviarMensaje = () =>{
    let paquete = { mail: document.getElementById("mail").value,
     mensaje: document.getElementById("mensaje").value,
     fecha: `${fecha.getDay()}/${fecha.getMonth()}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()} `
}
    socket.emit('paquete', paquete)
} 
socket.on('vermensajes', data => {
    
    let texto =""
    data.forEach((el,index) =>{
      texto += `<h3>Mail : ${el.mail} mensaje ${el.mensaje} fecha ${el.fecha} </h3><br>`    
   })
   document.getElementById("contenedordatos").innerHTML=texto

})








