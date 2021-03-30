const fs = require('fs')
const express = require('express')
const app = express()
//lo agrege yo
var router = express.Router()
const handlebars= require('express-handlebars')
var moduloLeerChat= require('./moduloLeerChat');
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// Le pasamos la constante app que creamos arriba
const http = require('http').Server(app)
// Le pasamos la constante http
const io = require('socket.io')(http)


// configuracion handlebars
app.engine(
    'hbs',
     handlebars ({ 
    extname: ".hbs",
    defaultLayout:'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/'
     }) 
  )
  app.set("view engine","hbs")
  app.set("views","./views")
  app.use(express.static("public"))


      router.get('/', function (req, res) {
        res.status(200).render('cliente');
      })
      
 
    // El servidor funcionando en el puerto 3000
    app.use('/',router)
    http.listen(3000, () => console.log('SERVER ON'))
    
 
    //...

  io.on('connection', (socket) => {
    // "connection" se ejecuta la primera vez que se abre una nueva conexión
      console.log('¡Nuevo cliente conectado!')
     
      moduloLeerChat.leer(fs).then(guardados=>{
        socket.emit('vermensajes', JSON.parse(guardados))
      })  
    
      // 
   
      
      socket.on('paquete', data => { //recibe informacion 

      console.log(data)
     
      //io.sockets.emit('frases', frases) //manda a todos los clientes
       })
    
    })

    