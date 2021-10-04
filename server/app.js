const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const { MONGOURI } = require('./keys')
const cors = require('cors')

app.use(cors())

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Connected...')
})
mongoose.connection.on('error', (err) => {
    console.log('error while connecting', err)
})

require('./models/user')
require('./models/post')


app.use(express.json())

const auth = require('./routes/auth')
const post = require('./routes/post')
const user = require('./routes/user')


app.use(auth)
app.use(post)
app.use(user)

const server = require('http').createServer(app)
const io = require('socket.io')(server)

const users = [{}]

app.get('/', (req, res) => {
    res.send('hello') 
})


io.on('connection', (socket) => {
    console.log('New connection')

    socket.on('joined', ({ user }) => {
        users[socket.id] = user
        console.log(`${user} has joined`)
        socket.broadcast.emit('userJoined', { user: 'Admin', message: `: ${users[socket.id]} has joined` })
        socket.emit('welcome', { user: 'Admin', message: ` Welcome to the chat, ${users[socket.id]}` })
    })

    socket.on('message', ({ message, id }) => {
        io.emit('sendMessage', { user: users[id], message, id })
    })

    socket.on('disconnect', () => {
        socket.broadcast.emit('leave', { user: 'Admin', message: `${users[socket.id]} has left` })
        console.log('user has left')
    })


})


server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
