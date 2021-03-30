const express = require('express')
const app = express()
//lo agrege yo
var router = express.Router()
const handlebars= require('express-handlebars')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// Le pasamos la constante app que creamos arriba
const http = require('http').Server(app)
// Le pasamos la constante http
const io = require('socket.io')(http)
let frases =[] 


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




//...
    // Indicamos que queremos cargar los archivos estáticos que se encuentran en dicha carpeta
    app.use(express.static('./public'))
    // Esta ruta carga nuestro archivo index.html en la raíz de la misma
    router.get('/', function (req, res) {
        res.sendFile('views/cliente.hbs', {root: __dirname})
      })
    /*
    app.get('/', (req, res) => {
        res.sendFile('views/cliente.html', {root: __dirname})
    })
    */
    // El servidor funcionando en el puerto 3000
    app.use('/',router)
    http.listen(3000, () => console.log('SERVER ON'))
    
 
    //...

  io.on('connection', (socket) => {
    // "connection" se ejecuta la primera vez que se abre una nueva conexión
      console.log('¡Nuevo cliente conectado!')
      socket.emit('frases', frases)
    // Se imprimirá solo la primera vez que se ha abierto la conexión
      socket.on('ingreso caracter', data => { //recibe informacion 
      console.log(data)
      io.sockets.emit('parrafo', data) //manda a todos los clientes
      })
      
      socket.on('frase', data => { //recibe informacion 
      frases.push({ socketid: socket.id , mensaje: data})
      
      io.sockets.emit('frases', frases) //manda a todos los clientes
        })
    
    })

    