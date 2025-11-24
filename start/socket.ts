import app from '@adonisjs/core/services/app';
import { Server, Socket } from 'socket.io';


const adonisServer = await app.container.make('server')

const io = new Server(
    adonisServer.getNodeServer(),
    {
        cors: {
            origin: ['http://localhost', 'http://127.0.0.1:5500'],
            methods: ['GET', 'POST']
        }
    }
)

try {
    io.listen(3334)
    console.log('Server in ascolto sulla porta 3334')
} catch (error) {
    console.error('Server non avviato')
    console.error(error)
}

let lista: Socket
// let tabellone: Socket

const roomName = "tabelloni"

io.on('connection', (socket) => {
    console.log('nuova connessione', socket.id)

    socket.on('identifica', (data) => {
        if (data == 'lista')
            lista = socket
        else {
            socket.join(roomName)
            // tabellone = socket
        }

        // console.log(lista?.id, tabellone?.id)
    })

    socket.on('chiama', (data) => {
        //mando il messaggio direttamente al tabellone
        // tabellone?.emit('mostra-numero', data)
        // lo mando in broadcast a tutti (compreso il 'chiamante')
        // io.emit('mostra-numero', data)
        // lo mando a tutti (escluso il 'chiamante')
        // socket.broadcast.emit('mostra-numero', data)

        socket.to(roomName).emit('mostra-numero', data)
    })

    // socket.on('evento-di-test-da-fe-a-be', (data) => {
    //     console.log('ho ricevuto un evento di test', data)
    // })

    // setInterval(() => {
    //     socket.emit('evento-di-test-da-be-a-fe', { prova: 'prova' })
    // }, 5000)


})
