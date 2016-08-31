/*

This is some new changes 

*/
var https    = require("https");              // http server core module
var express = require("express");           // web framework external module
var io      = require("socket.io");         // web socket external module
var easyrtc = require("easyrtc");           // EasyRTC external module

// Setup and configure Express http server. Expect a subfolder called "static" to be the web root.
var httpApp = express();
httpApp.use(express.static(__dirname + "/static/"));

var fs = require('fs');
var options = {
    key: fs.readFileSync('/home/ubuntu/kurento-recorder/cert/alphassl.key'),
    cert: fs.readFileSync('/home/ubuntu/kurento-recorder/cert/alphassl.crt')
};
// Start Express http server on port 90
var webServer = https.createServer(options, httpApp).listen(80);

// Start Socket.io so it attaches itself to Express server
var socketServer = io.listen(webServer, {"log level":1});

// Start EasyRTC server
var rtc = easyrtc.listen(httpApp, socketServer);
