/* eslint-disable no-console */
const AvcServer = require('../lib/server')
const path = require('path')
const http = require('http')
// const WebSocketServer = require('uws').Server
const { WebSocketServer } = require('@clusterws/cws')
// require('uWebSockets.js')
const net = require('net')
const spawn = require('child_process').spawn

const useRaspivid = process.argv.includes('raspivid')
const width = 1280
const height = 720

const express = require('express')
const app = express()
// serve the html/index.html
app.use(express.static(path.resolve(__dirname, 'html/cams')))
// serve the player
app.use(express.static(path.resolve(__dirname, '../lib')))

const server = http.createServer(app)













// init web socket
const wss = new WebSocketServer({ port: 3333 })
// init the avc server.
const avcServer = new AvcServer(wss, width, height)

// handling custom events from client
avcServer.client_events.on('custom_event_from_client', e => {
    console.log('a client sent', e)
    // broadcasting custom events to all clients (if you wish to send a event to specific client, handle sockets and new connections yourself)
    avcServer.broadcast('custom_event_from_server', { hello: 'from server' })
})

// create the tcp sever that accepts a h264 stream and broadcasts it back to the clients
this.tcpServer = net.createServer((socket) => {
// set video stream
    socket.on('error', e => {
        console.log('video downstream error:', e)
    })
    avcServer.setVideoStream(socket)

})
this.tcpServer.listen(4900, '0.0.0.0')








// init web socket
const wss2 = new WebSocketServer({ port: 3334 })
// init the avc server.
const avcServer2 = new AvcServer(wss2, width, height)

// handling custom events from client
avcServer2.client_events.on('custom_event_from_client', e => {
    console.log('a client sent', e)
    // broadcasting custom events to all clients (if you wish to send a event to specific client, handle sockets and new connections yourself)
    avcServer2.broadcast('custom_event_from_server', { hello: 'from server' })
})

this.tcpServer2 = net.createServer((socket) => {
// set video stream
    socket.on('error', e => {
        console.log('video downstream error:', e)
    })
    avcServer2.setVideoStream(socket)
})
this.tcpServer2.listen(4901, '0.0.0.0')








// init web socket
const wss3 = new WebSocketServer({ port: 3335 })
// init the avc server.
const avcServer3 = new AvcServer(wss3, width, height)

// handling custom events from client
avcServer3.client_events.on('custom_event_from_client', e => {
    console.log('a client sent', e)
    // broadcasting custom events to all clients (if you wish to send a event to specific client, handle sockets and new connections yourself)
    avcServer3.broadcast('custom_event_from_server', { hello: 'from server' })
})

this.tcpServer3 = net.createServer((socket) => {
// set video stream
    socket.on('error', e => {
        console.log('video downstream error:', e)
    })
    avcServer3.setVideoStream(socket)
})
this.tcpServer3.listen(4902, '0.0.0.0')








// init web socket
const wss4 = new WebSocketServer({ port: 3336 })
// init the avc server.
const avcServer4 = new AvcServer(wss4, width, height)

// handling custom events from client
avcServer4.client_events.on('custom_event_from_client', e => {
    console.log('a client sent', e)
    // broadcasting custom events to all clients (if you wish to send a event to specific client, handle sockets and new connections yourself)
    avcServer4.broadcast('custom_event_from_server', { hello: 'from server' })
})

this.tcpServer4 = net.createServer((socket) => {
// set video stream
    socket.on('error', e => {
        console.log('video downstream error:', e)
    })
    avcServer4.setVideoStream(socket)
})
this.tcpServer4.listen(4903, '0.0.0.0')








server.listen(8081)












// if not using raspivid option than use one of this to stream
// ffmpeg OSX
// then run ffmpeg: ffmpeg -framerate 30 -video_size 640x480 -f avfoundation -i 0  -vcodec libx264 -vprofile baseline -b:v 500k -bufsize 600k -tune zerolatency -pix_fmt yuv420p -r 15 -g 30 -f rawvideo tcp://localhost:5000

// fmpeg Windows:

// ffmpeg -framerate 25 -video_size 640x480 -f dshow -i "video=<DEVICE>"  -vcodec libx264 -vprofile baseline -b:v 500k -bufsize 600k -tune zerolatency -pix_fmt yuv420p -f rawvideo tcp://localhost:5000

// to get video devices run:
// ffmpeg -list_devices true -f dshow -i dummy

// To get options of the device: 
// ffmpeg -f dshow -list_options true -i video="<Device>"


// examples:
// ffmpeg -framerate 25 -video_size 640x480 -f dshow -i video="HD Camera"  -vcodec libx264 -vprofile baseline -b:v 500k -bufsize 600k -tune zerolatency -pix_fmt yuv420p -f rawvideo tcp://localhost:5000

// ffmpeg -framerate 25 -video_size 1280x720 -f dshow -i "video=Logitech HD Webcam C270"  -vcodec libx264 -vprofile baseline -b:v 500k -bufsize 600k -tune zerolatency -pix_fmt yuv420p -f rawvideo tcp://localhost:5000
// ffmpeg.exe -framerate 30 -video_size 1280x720 -f dshow -i video="HD Camera"  -vcodec libx264 -vprofile baseline -b:v 2m -bufsize 2m -pass 1 -coder 0 -bf 0 -flags -loop -tune zerolatency -pix_fmt yuv420p -wpredp 0 -f rawvideo tcp://localhost:5000
// RPI
// /opt/vc/bin/raspivid -pf baseline -ih -t 0 -w 640 -h 480 -hf -fps 15 -g 30 -o - | nc localhost 5000
