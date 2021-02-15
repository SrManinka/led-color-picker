// for website connection
const express = require('express');
const bodyParser = require('body-parser')
var cors = require('cors')
//https://imgur.com/a/nGKlrTi
// for Serial Comunication
const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

//uncomment  the next line to see port list
//(async()=>{console.log(await SerialPort.list())})()


// Defining the serial port
const portName = "COM14"

//starts connection
const port = new SerialPort(portName, {
    baudRate: 9600,
});


const parser = new Readline();
port.pipe(parser);
parser.on("data", (line) => {
    //logs the data received
    console.log(line)
}
);

port.on('error',( (e)=>console.log(e)));


const app = express();
const routes = express.Router()


// to let our website connect with
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors())
app.use('/', routes.post('/', (req, res) => {
    port.write(String(req.body))
    res.send({ success: true })
}))

app.listen('3000')