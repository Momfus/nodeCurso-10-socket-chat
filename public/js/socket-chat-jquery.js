// Archivo que se va a encargar de renderizar y actualizar las cosas de html usando jquery

var params = new URLSearchParams(window.location.search);

var nombre = params.get('nombre');
var sala = params.get('sala');

// Referencias de jQuery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');


// Funciones para renderizar usuarios
function renderizarUsuarios( personas ) { // Espero un arreglo de esta forma [{}, {}, {}]

    console.log(personas);

    var html = '';

    html += '<li>'
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>'
    html += '</li>'
    
    

    // Para recorrer todas las personas conectadas y renderizarlas en un html
    for( var i = 0; i < personas.length; i++) {
    
    html += '<li>'
    html += '    <a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre +  '<small class="text-success">online</small></span></a>'
    html += '</li>'

    }

    // Renderizar el html a partir del id seleccionado
    divUsuarios.html(html);

}



// Listeners

//--> Para obtener el id del usuario seleccionado (se puede usar para enviarles un mensaje privado por ejemplo)
divUsuarios.on('click', 'a', function() { // Esta pendiende de los "archor tag" (etiquetas a) al hacerse click dentro del ID señalado al principio

    var id = $(this).data('id');

    //Excepcion por si se selecciona el tag de la sala
    if( id)  {
        console.log(id);
    }
    

});

// Se renderiza el mensaje de texto del chat
function renderizarMensajes( mensaje, yo ) {

    // Mensaje azul = otros usuarios; gris = propios del usuario

    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info'; // clase a usar cuando el usaurio sale
    
    if( mensaje.nombre === 'Administrador') { // Esto es un ejemplo, no deberiamos dejar que alguien se llame como administrador

        adminClass = 'danger';

    }
    
    // Según de quien es el mensaje
    if( yo ) {

        // Mensajes propios
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';
        
    } else {
        
        // De otros usuarios
        html += '<li class="animated fadeIn">';

        if( mensaje.nombre !== 'Administrador') {
            
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';

        }


        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    }

    divChatbox.append(html);

}

// Función brindada por el profesor del curso para que al recibir o enviar mensaje, se haga scroll de la ventana al fondo
function scrollBottom() {

    // Realizado parte en jQuery y lo demas es javascript

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}


// Para enviar mensaje al hacer enviar en el boton
formEnviar.on('submit', function(event) {

    event.preventDefault(); // Previene opciones por defecto del evento

    if( txtMensaje.val().trim().length === 0 ) { // trim es para borrar espacios al principio y final
    
        return; // No devuelve nada, sale de la función
        
    }
    
    // Enviar información
    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function(mensaje) {
        
        txtMensaje.val('').focus; // Borrar caja de texto lo escrito (el focus es por si se selecciona el boton, vuelve el foco al cuadro de texto)
        renderizarMensajes(mensaje, true);
        scrollBottom();

    });
    

});