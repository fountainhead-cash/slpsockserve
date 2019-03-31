## What is SLPSockserve?

SLPSockserve is a frontend API for SLPDB that provides a streaming output of new transactions. Unlike [slpserve](https://github.com/fountainhead-cash/slpserve) which is a similar frontend API used to fetch historical blockchain data, SLPSockserve can be used display data as it comes in.

## Installation

### Prerequisite

For SLPSockserve to work you first need to go through the install process for [bitd](https://github.com/simpledger/SLPDB), which will continually scan the blockchain for new transactions and blocks which will be streamed live over the SLPsocket (slpsockserve) API.

### Setting up SLPSockserve

Clone this repository:
```
git clone https://github.com/fountainhead-cash/slpsockserve.git && cd slpsockserve
```

Install dependencies:
```
npm install
```

Configure Sockserve:
```
cp .env.example .env
$(EDITOR) .env

```

Start SLPSockserve
```
npm start
```

### Running as a daemon

Install PM2 using NPM
```
npm install pm2 -g
```

CD to install location and run bitd
```
pm2 start index.js
```
