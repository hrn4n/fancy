var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var socket = require('socket.io');
var server = http.createServer(app);
var jsonfile = require('jsonfile');
var count = 0;

var index = require('./server/routes/index');
var io = socket.listen(server);
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'jade');

io.sockets.on('connection', function (socket) {
    count++;
    console.log('usuario numero '+count)
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/horarios/:materias', function(req, res, next) {
 	var materias = JSON.parse(req.params.materias);
 	jsonfile.readFile('./public/materias.json', function(err, obj) {
     	if(materias.length == obj.length){
            res.json(obj.filter(obj => materias.some(m => m == obj.codigo)));
        }else{
            res.status(400);
        }
    })
});

app.get('/petroleo', function (req, res) {
    setTimeout(()=>res.send(require(path.join(__dirname, 'petroleo.json'))),5000);
});

server.listen(8080, function () {
  console.log('conectado');
});