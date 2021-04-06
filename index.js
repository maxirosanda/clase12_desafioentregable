var fs = require('fs');
var express = require('express');
var moduloLeer = require('./modulos/moduloLeer');
var moduloGuardar = require('./modulos/moduloGuardar');
var moduloActualizar = require('./modulos/moduloActualizar');
var moduloBorrar = require('./modulos/moduloBorrar');
var moduloLeerChat = require('./modulos/moduloLeerChat');
var moduloGuardarChat = require('./modulos/moduloGuardarChat');
var app = express();
var router = express.Router();
var handlebars = require('express-handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//----------------------------------------------
var http = require('http').Server(app);
var io = require('socket.io')(http);
//-------------------------------
var arreglo = [];
// configuracion handlebars
app.engine('hbs', handlebars({
    extname: ".hbs",
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials/'
}));
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.static("public"));
//-----------------------Lista------------------------------------------------
moduloLeer.leer(fs).then(function (guardados) {
    if (guardados)
        arreglo = JSON.parse(guardados);
    router.get('/productos/vista', function (req, res) {
        res.status(200).render('lista', { arreglo: arreglo, listExists: true });
    });
    //-----------------------Producto individual------------------------------------
    router.get('/listar/:id', function (req, res) {
        var id = parseInt(req.params.id);
        var existe = false;
        arreglo.forEach(function (element, index) {
            if (element.id == id) {
                res.status(200).json(arreglo[index]);
                existe = true;
            }
        });
        if (!existe) {
            return res.status(400).json({ "error": "Producto no encontrado" });
        }
    });
});
//------------------------- formulario vista------------------------------
router.get('/productos', function (req, res) {
    res.status(200).render('formulario');
});
//------------------------------Guardar---------------------------------------
router.post('/productos/', function (req, res) {
    moduloGuardar.guardar(req.body.nombre, req.body.precio, req.body.url, fs);
    res.status(200).redirect('/api/productos/');
});
//------------------------------Actualizar---------------------------------------
router.put('/productos/:id', function (req, res) {
    moduloActualizar.actualizar(req.body.nombre, req.body.precio, req.body.url, parseInt(req.params.id), fs);
    res.status(200).json("actualizado");
});
//-------------------------------Borrar-------------------------------------
router["delete"]('/productos/borrar/:id', function (req, res) {
    moduloBorrar.borrar(parseInt(req.params.id), fs);
    res.status(200).json("Borrado");
});
//---------------------------------------------------------------------------
app.use('/api', router);
app.use(express.static('public'));
var port = 8080;
var server = app.listen(port, function () {
    console.log("Example app listening at http://localhost:" + port);
});
server.on("error", function (error) { return console.log("error en servidor " + error); });
//----------------------------------------------------------------------
http.listen(3000, function () { return console.log('SERVER ON'); });
//-------------------------------------------------------------------------
router.get('/chat', function (req, res) {
    res.status(200).render('./partials/chat');
});
router.get('/lista2', function (req, res) {
    res.status(200).render('./partials/lista');
});
//-------------------------------------
io.on('connection', function (socket) {
    console.log('¡Nuevo cliente conectado!');
    moduloLeerChat.leer(fs).then(function (guardados) {
        socket.emit('vermensajes', JSON.parse(guardados));
    });
    socket.on('paquete', function (data) {
        moduloGuardarChat.guardar(data.mail, data.mensaje, data.fecha, fs);
    });
    moduloLeer.leer(fs).then(function (guardados) {
        socket.emit('lista', JSON.parse(guardados));
    });
});
