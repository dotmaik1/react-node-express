const SocketEvent = require('./socket_event').SocketEvent;
const utf8 = require('utf8');


const onMessage = (socket) => {
    return new SocketEvent('message', (message) => {
        socket.emit('message', 'alive');
        console.log(`A client is speaking to me! They’re saying: ${message}`);
    });
};

exports.onConnection = new SocketEvent('connection', (socket) => {

    const socketEvents = [
        onMessage(socket)
    ];

    socketEvents.forEach((evt) => {
        socket.on(evt.name, evt.handler);
    });

});