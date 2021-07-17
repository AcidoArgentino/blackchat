const 
    express  = require('express'),
    path     = require('path'),
    socketIO = require('socket.io');

const app = express();

// configuracion
app.set('port', process.env.PORT || 3000);

// archivos estaticos
app.use(express.static(path.join(__dirname,'public')));


// iniciar servidor
const server = app.listen(app.get('port'), () => {
    console.log("servidor escuchando puerto ", app.get('port'));
});

const io = socketIO(server);

// web socket
io.on('connection', (socket) => {
    console.log('nueva conexión establecida', socket.id);

    socket.on('chat:message',(data)=> {
        io.sockets.emit('chat:message',data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data);
    });

});
