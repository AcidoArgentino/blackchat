
const socket = io(), 
getById = (idName) => {
    const r = document.getElementById(idName); 
    if(r !== undefined){
        return r;
    } 
    console.log('No existe un elemento que contenga el id: ',idName);
};


const 
    message  = getById('message'),
    username = getById('username'),
    output   = getById('output'),
    btn      = getById('send'),
    actions  = getById('actions');

btn.addEventListener('click' , (evt)=> {
    socket.emit('chat:message', {
        username: username.value,
        message : message.value
    });
    message.value = '';
});


message.addEventListener('keypress' , () => {
    socket.emit('chat:typing', username.value);
});

socket.on('chat:message', (data) => {
    actions.innerHTML = '';
    const parrafo = document.createElement('p'), 
          usuario = document.createElement('strong'),
          contenedor = document.createElement('div'),
          fragment = document.createDocumentFragment();
    
    usuario.textContent = data.username+':';
    parrafo.textContent = data.message;
    contenedor.append(usuario,parrafo);
    fragment.appendChild(contenedor);

    output.appendChild(fragment);
});


socket.on('chat:typing', (data) => {
    actions.innerHTML = `<p><em>${data} esta escribiendo </em></p>`;
} );

