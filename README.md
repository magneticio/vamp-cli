# Vamp CLI (work in progress)

This CLI for [vamp](https://vamp.io) replace the old Scala based CLI.

## Installation

Vamp CLI is a Node.js package. Install it globally  and export the host address of your Vamp installation via `VAMP_HOST`.  
Now you can run commands, e.g. `list breeds`
```bash
npm install -g vamp-cli
export VAMP_HOST=http://vamp-host
vamp list breeds
```

## Use programmaticaly

You can include the vamp-cli package in your code. It will expose the `api` object which you can use to interact with 
Vamp in your Node.js code.  
Configure the host by either setting the `VAMP_HOST` environment variable or pass in a config object with a `host` entry


```javascript
const vamp = require('vamp-cli')({ host: 'http://localhost:8080'})

vamp.breed.list()
  .then(res => console.info(res))
```
