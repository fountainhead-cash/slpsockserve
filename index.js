require('dotenv').config()
const express = require('express')
const ip = require('ip')
const app = express()
const cors = require("cors")

const config = {
  "query": {
    "v": 3,
    "q": { "find": {} },
    "r": {
      "f": "[.[] | .out[] | .str]"
     }
  },
  "url": process.env.bitsocket_url ? process.env.bitsocket_url : "http://127.0.0.1:3000/s/",
  "port": Number.parseInt(process.env.sockserve_port ? process.env.sockserve_port : 3005)
};

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
  console.log("#  SOCKSERVE: Bitsocket Microservice")
  console.log("#  Serving Transactions through HTTP...")
  console.log("#")
  console.log(`#  Channel: ${ip.address()}:${config.port}/channel`);
  console.log("#")
  console.log("#  Learn more at https://docs.fountainhead.cash")
  console.log("#")
  console.log("######################################################################################");
  }
)
