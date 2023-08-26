const { ArtNetController } =  require('artnet-protocol/dist/index.js');
const { Server } =  require("socket.io");
const express =  require('express');
const http =  require('http');
const { networkInterfaces } = require('os');
require('dotenv').config()



const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.WEB_PORT || 3000
const universe = parseInt(process.env.DMX_UNIVERSE) || 0;
const interfaces = networkInterfaces();
let ipList = []
Object.keys(interfaces).forEach(key =>{ interfaces[key].forEach(ip => {if (ip.family === "IPv4") {ipList.push(ip)}}) })

let connected = false;
let controller = null;

const StartDMX = (ip) => {
	controller = new ArtNetController();
	controller.bind(ip);
	controller.on('dmx', (dmx) => {
		try {
			if (!connected) {
				connected = true;
				console.log("device connected", dmx)
			}

			// dmx contains an ArtDmx object
			if (dmx.universe === universe) {
				console.log("sending DMX data to client:", dmx.data)
				io.emit('DMX message', dmx.data);
			}
		} catch (error) {
			console.log(error)
		}

	});
}

io.on('connection', (socket) => {
	console.log('a user connected');
	io.emit('IP list', ipList);
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
	socket.on('connectDMX', (ip) => {
		StartDMX(ip);
	});
});

app.use(express.static('public'))

server.listen(port, async () => {
	console.log(`listening on *:${port}`);
	require("openurl").open(`http://localhost:${port}`)
});
