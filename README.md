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

## Using the CLI

For a list of all commands, just run the `--help` command

```bash
$ vamp

  Usage: vamp <command> [options]


  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    create [options] <artifact>                Creates an blueprint or breed artifact based on passed YAML. Returns the created artifact after creation.
    delete <artifact> <name>                   Deletes artifacts like gateways, blueprints, breeds, workflows
    deploy [options] <blueprint> <deployment>  Creates a deployment, based on a blueprint, with a specified name
    describe <artifact> <name>                 Describe details of a deployment, gateway, blueprint, breed, workflow
    emit [options] <value>                     Sends an event to Vamp event system. Returns the created event on success.
    generate [options] <artifact>              Generate a breed or blueprint based on an existing one.
    list <artifact>                            Lists deployments, gateways, blueprints, breeds, workflows
    merge <blueprint> <deployment>             Merges a blueprint to a  deployment
    undeploy [options] <deployment>            Removes a deployment or a specific service in a deployment.
```

## Using the cLI programmaticaly

You can include the vamp-cli package in your code. It will expose the `api` object which you can use to interact with 
Vamp in your Node.js code.  
Configure the host by either setting the `VAMP_HOST` environment variable or pass in a config object with a `host` entry


```javascript
const vamp = require('vamp-cli')({ host: 'http://localhost:8080'})

vamp.breed.list()
  .then(res => console.info(res))
```
