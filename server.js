require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const emitter = require('events')

app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())


mongoose.connect("mongodb://localhost:27017/pizza");
app.use(flash())


var eventEmitter = new emitter()
app.set('eventEmitter',eventEmitter)

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/pizza' }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))


const passportinit = require('./app/config/passport')
const { createRequire } = require('module')
passportinit(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
  });

require('./routes/web')(app)



const server = app.listen(PORT, () => {
    console.log("listening on port 3000")
})


//socket
const io = require('socket.io')(server)
io.on('connection',(socket)=>{
socket.on('join',(orderId)=>{
    socket.join(orderId)
})
})