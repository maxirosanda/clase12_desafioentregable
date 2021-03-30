const socket = io()


socket.on('lista', data => {

    let texto =""
    data.forEach((el,index) =>{
      texto += `<h3>id : ${el.id} title ${el.title} price ${el.price} price ${el.thumbnail} </h3><br>`    
   })
   document.getElementById("contenedordatos").innerHTML=texto
  
})
