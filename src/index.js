const { Server } = require('socket.io')

const server = new Server(process.env.PORT || 3000)

const clients = {}

server.on('connection', client => {
    console.log("Cliente ", client.id, " conectado.")

    client.on('choose-name', name => {
        client.emit('name-result', { success: clients[name] === undefined })
        if (!clients[name]) {
            clients[name] = {}
            console.log(name, 'Entró al chat.')
        }


    })

    client.on('send-message', data => {
        client.broadcast.emit('new-message', data)
    })
})
