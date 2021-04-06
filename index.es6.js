const fs = require('fs')
const express = require('express')
let moduloLeer= require('./modulos/moduloLeer');
let moduloGuardar= require('./modulos/moduloGuardar');
let moduloActualizar =require('./modulos/moduloActualizar')
let moduloBorrar = require('./modulos/moduloBorrar')
let moduloLeerChat= require('./modulos/moduloLeerChat');
let moduloGuardarChat= require('./modulos/moduloGuardarChat');
const app = express()
let router = express.Router()
const handlebars= require('express-handlebars')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//----------------------------------------------
const http = require('http').Server(app)
const io = require('socket.io')(http)
//-------------------------------



let arreglo=[]
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

//-----------------------Lista------------------------------------------------
moduloLeer.leer(fs).then(guardados=>{

  if(guardados) arreglo = JSON.parse(guardados)

  router.get('/productos/vista', function (req, res) {
    res.status(200).render('lista', {arreglo:arreglo,listExists:true});
  })

//-----------------------Producto individual------------------------------------

 router.get('/listar/:id', function (req, res) {
    let id = parseInt(req.params.id)
    let existe =false
    arreglo.forEach((element,index) =>{
      if (element.id == id){
        res.status(200).json(arreglo[index])   
        existe=true  
      }    

  })
  if(!existe){
    return res.status(400).json({"error": "Producto no encontrado"});
}
    
  })

})
//------------------------- formulario vista------------------------------
router.get('/productos', function (req, res) {
  res.status(200).render('formulario');
})
//------------------------------Guardar---------------------------------------

router.post('/productos/', function (req, res) {
    moduloGuardar.guardar(req.body.nombre,req.body.precio,req.body.url,fs)
    res.status(200).redirect('/api/productos/')
  })

//------------------------------Actualizar---------------------------------------


router.put('/productos/:id', function (req, res) {
  moduloActualizar.actualizar(req.body.nombre,req.body.precio,req.body.url,parseInt(req.params.id),fs)
  res.status(200).json("actualizado")
})

//-------------------------------Borrar-------------------------------------
router.delete('/productos/borrar/:id', function (req, res) {
 moduloBorrar.borrar(parseInt(req.params.id),fs)

    res.status(200).json("Borrado")  
})
//---------------------------------------------------------------------------
app.use('/api',router)
app.use(express.static('public'));
const port = 8080 
const server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  server.on("error",error =>console.log(`error en servidor ${error}`))
  //----------------------------------------------------------------------
http.listen(3000, () => console.log('SERVER ON'))

//-------------------------------------------------------------------------

router.get('/chat', function (req, res) {
  res.status(200).render('./partials/chat');
})
router.get('/lista2', function (req, res) {
  res.status(200).render('./partials/lista');
})

//-------------------------------------
io.on('connection', (socket) => {

  console.log('¡Nuevo cliente conectado!')
 
  moduloLeerChat.leer(fs).then(guardados=>{
    socket.emit('vermensajes', JSON.parse(guardados))
  })  

  

  
  socket.on('paquete', data => { //recibe informacion 
    moduloGuardarChat.guardar(data.mail,data.mensaje,data.fecha,fs)


   })

   moduloLeer.leer(fs).then(guardados=>{
    socket.emit('lista', JSON.parse(guardados))
  })  

})
  