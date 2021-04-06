const fs = require('fs')
const express = require('express')
const app = express()
//lo agrege yo
var router = express.Router()
const handlebars= require('express-handlebars')
var moduloLeerChat= require('./modulos/moduloLeerChat');
var moduloGuardarChat= require('./modulos/moduloGuardarChat');
var moduloLeer= require('./modulos/moduloLeer');
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


    // El servidor funcionando en el puerto 3000
    app.use('/',router)
    http.listen(4757, () => console.log("SERVER ON"));
    
 
    //...
    router.get('/chat', function (req, res) {
      res.status(200).render('chat');
    })
    router.get('/lista2', function (req, res) {
      res.status(200).render('lista');
    })
    
  io.on('connection', (socket) => {
    // "connection" se ejecuta la primera vez que se abre una nueva conexión
      console.log('¡Nuevo cliente conectado!')
     
      moduloLeerChat.leer(fs).then(guardados=>{
        socket.emit('vermensajes', JSON.parse(guardados))
      })  
    
      // 
   
      
      socket.on('paquete', data => { //recibe informacion 
        moduloGuardarChat.guardar(data.mail,data.mensaje,data.fecha,fs)
  

       })

       moduloLeer.leer(fs).then(guardados=>{
        socket.emit('lista', JSON.parse(guardados))
      })  
    
    })

    