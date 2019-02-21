## What is Sockserve?

Sockserve is a frontend API for Bitd that provides a streaming output of new transactions. Unlike [Bitserve](https://github.com/fountainhead-cash/bitserve) which is a similar frontend API used to fetch historical blockchain data, Sockserve can be used display data as it comes in.

## Installation

### Prerequisite

For Sockserve to work you first need to go through the install process for [bitd](https://github.com/fountainhead-cash/bitd), which will continually scan the blockchain for new transactions and blocks which will be streamed live over the Bitsocket (sockserve) API.

### Setting up Sockserve

Clone this repository:
```
git clone https://github.com/fountainhead-cash/sockserve.git && cd sockserve
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

Start Sockserve
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
