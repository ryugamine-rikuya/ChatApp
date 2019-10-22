const express = require('express')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 5001
const server = app.listen(port, host)
const io = require('socket.io')(server, {
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 500000,
  cookie: false
})

let messageQue = []
let clientList = {}
let socketList = {}
io.on('connection', function (socket) {
  socket.on('login', function (msg) {
    console.log(socket.id)
    io.emit('message', msg)
    clientList[socket.id] = msg.id
    socketList[socket.id] = msg.user
    messageQue.push(msg)
    for (let value of messageQue) {
      socket.emit('message', value)
    }
  })
  socket.on('message', function (msg) {
    messageQue.push(msg)
    io.emit('message', msg)
  })
  socket.on('disconnect', function (msg) {
    let date = new Date()
    let hour = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours()
    let min = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()
    msg = {
      type: 'login',
      message: 'logout',
      id: clientList[socket.id],
      user: socketList[socket.id],
      date: date,
      hour: hour.toString(10),
      min: min.toString(10)
    }
    io.emit('message', msg)
    messageQue.push(msg)
  })
})

app.use(express.static(__dirname + "/dist/"))
app.get(/.*/, function (req, res) {
  res.sendfile(__dirname + "/dist/index.html")
})

app.listen(port)
console.log('listening')
