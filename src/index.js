const { Server } = require('socket.io')

const server = new Server(process.env.PORT || 3000)

const clients = {}

server.on('connection', client => {
    client.on('choose-name', name => {
        client.emit('name-result', { success: clients[name] === undefined })
        if (!clients[name]) {
            clients[name] = {}
        }
    })

    client.on('change-name', name => {
        delete clients[name]
    })

    client.on('send-message', data => {
        client.broadcast.emit('new-message', data)
    })
})
