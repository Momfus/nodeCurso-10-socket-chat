var socket = io();


// leer por parametro el nombre del usuario
var params = new URLSearchParams( window.location.search );

if( !params.has('nombre') || !params.has('sala') ) {

    window.location = 'index.html'; // Redirigir al inicio
    throw new Error('El nombre y sala son necesarios es necesario');

}

var usuario = {

    nombre: params.get('nombre'),
    sala: params.get('sala')

};


// Al conectarse
socket.on('connect', function() {

    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(res) {
        
        console.log('Usuarios conectados', res);
        
    });

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información (comentado porque es un ejemplo de como enviamos los mensajes)
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

// Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on('listaPersona', function(personas) {

    console.log(personas);

});

// Mensajes privados
socket.on('mensajePrivado', function(mensaje) {

    console.log('Mensaje Privado: ', mensaje);
    

});