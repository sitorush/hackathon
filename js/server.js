var server = require('websocket').server, http = require('http');

var socket = new server({
    httpServer: http.createServer().listen(1337)
});

console.log('Start the server on port 1337....');

var id;
var count = 0;

socket.on('request', function (request) {
    var connection = request.accept(null, request.origin);

    connection.on('message', function (message) {
        console.log(message.utf8Data);

        var sendItem = function () {
            connection.sendUTF('Streaming, this is websocket message from mock server. Count: ' + count);
            count++;
            id = setTimeout(sendItem, 1000);
        };

        if (message.utf8Data == 'start') {
            sendItem();
            console.log('start id: ' + id);
        }

        if (message.utf8Data == 'pause') {
            console.log('pause id: ' + id);
            clearTimeout(id);
        }

    });

    connection.on('close', function (connection) {
        console.log('connection closed');
    });
});