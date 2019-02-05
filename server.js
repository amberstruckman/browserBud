// Loading evnironmental variables here
require('dotenv').config();

const express = require('express')
// const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db') // loads our connection to the mongo database
const passport = require('./passport')
const app = express();
const PORT = process.env.PORT || 3001;
const apiRoutes = require('./routes');

//socket
var cors = require('cors');
const http = require('http')
const server = http.createServer(app)
var io = require('socket.io').listen(server);  

//cors unblocked
app.use(cors());


// ===== Middleware ====
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
	session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})
)

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

// ===== testing middleware =====
app.use(function(req, res, next) {
	// console.log('===== passport user =======')
	// console.log(req.session)
	// console.log(req.user)
	// console.log('===== END =======')
	next()
})
// testing
app.get(
	'/auth/google/callback',
	(req, res, next) => {
		// console.log(`req.user: ${req.user}`)
		// console.log('======= /auth/google/callback was called! =====')
		next()
	},
	passport.authenticate('google', { failureRedirect: '/login' }),
	(req, res) => {
		res.redirect('/')
	}
)

// ==== if its production environment!
if (process.env.NODE_ENV === 'production') {
	const path = require('path')
	console.log('YOU ARE IN THE PRODUCTION ENV')
	app.use('/static', express.static(path.join(__dirname, './client/build/static')))
	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, './client/build/'))
	})
}

/* Express app ROUTING */
app.use('/auth', require('./auth'))

// routes
//API routes
 app.use('/', apiRoutes);

// ====== Error handler ====
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======')
	console.error(err.stack)
	res.status(500)
})



// Socket listeners
// This is what the socket.io syntax is like
io.on('connection', socket => {
	console.log('New client connected')
	
	socket.on('SEND_MESSAGE', function(data){
		console.log(data);
		io.emit('RECEIVE_MESSAGE', data);
	})
	
// 	// disconnect is fired when a client leaves the server
	socket.on('disconnect', () => {
	  console.log('user disconnected')
	})
  });

// ==== Starting Server =====
server.listen(PORT, () => {
	console.log(`App listening on PORT ${PORT}`)
})
