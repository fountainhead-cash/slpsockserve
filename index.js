require('dotenv').config()
const express = require('express')
const ip = require('ip')
const app = express()
const cors = require("cors")
const slpsocketd = require('fountainhead-core').slpsocketd

const config = {
  "query": {
    "v": 3,
    "q": { "find": {} }
  },
  "host": process.env.slpsockserve_host ? process.env.slpsockserve_host : "http://127.0.0.1",
  "port": Number.parseInt(process.env.slpsockserve_port ? process.env.slpsockserve_port : 3001)
};
config.url = config.host + ":" + config.port + "/s/";

var db

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(cors())
app.enable("trust proxy")
app.get(/^\/channel\/(.+)/, function(req, res) {
  let encoded = req.params[0]
  let decoded = Buffer.from(encoded, 'base64').toString()
  res.render('channel', {
    bitserve_url: config.url,
    code: decoded
  })
});
app.get('/channel', function (req, res) {
  res.render('channel', {
    bitserve_url: config.url,
    code: JSON.stringify(config.query, null, 2)
  })
});
app.get('/', function(req, res) {
  res.redirect('/channel')
});
app.listen(config.port, () => {
  console.log("######################################################################################");
  console.log("#")
  console.log("#  SLPSOCKSERVE: SLPsocket Microservice")
  console.log("#  Serving Transactions through HTTP...")
  console.log("#")
  console.log(`#  Channel: ${ip.address()}:${config.port}/channel`);
  console.log("#")
  console.log("#  Learn more at https://docs.fountainhead.cash")
  console.log("#")
  console.log("######################################################################################");
  }
)

slpsocketd.init({
    bit: {
        host: process.env.zmq_outgoing_host ? process.env.zmq_outgoing_host : '0.0.0.0',
        port: Number.parseInt(process.env.zmq_outgoing_port ? process.env.zmq_outgoing_port : 28339)
    },
    socket: {
        port: process.env.slpsockserve_port ? process.env.slpsockserve_port : 3000,
        app: app
    },
    heartbeat: 10,
    verbose: true
});

