const { Server } = require('socket.io')
const cors = require('cors')
const express= require('express')

const app = express()

app.use(cors('*'))

const server = new Server()

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

app.listen(() => console.log('server working'))