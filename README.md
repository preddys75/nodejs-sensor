# Instana Node.js Monorepo

**[Changelog](CHANGELOG.md)** |
**[Contributing](CONTRIBUTING.md)** |
**[@instana/collector](packages/collector/README.md)**

---

This repository hosts Instana's Node.js packages. If you are an Instana user, you are probably looking for the package [@instana/collector](packages/collector/README.md) (formerly known as `instana-nodejs-sensor`) to add Instana monitoring and tracing to your Node.js applications.

## Important: Change of Package Name

To pave the way for new, exciting times to come, we are changing the name of the package in a more modular fashion: up to release `1.64.0`, our npm package was called `instana-nodejs-sensor`. Beginning with version `1.65.0` the name has changed to `@instana/collector`. **To prevent breaking changes, we are keeping `instana-nodejs-sensor` as an alias for `@instana/collector`**, so you can continue updating your Node.js applications using the latest Instana Node.js integration without further changes. In the future, **we might make some functionality that needs the newly-introduced modularity available only under the new `@instana/collector` package name**. Such new functionality will not affect existing use cases for the Instana Node.js sensor. Please refer to our [migration guide](https://github.com/instana/nodejs-sensor/tree/master/packages/collector#migrating-from-instana-nodejs-sensor-to-instanacollector) for details.

## Direct Links to @instana/collector

The README file for the package formerly known as `instana-nodejs-sensor` that was located in the root folder of this repository up until release 1.64.0 has moved to the [@instana/collector](packages/collector/README.md) package. The following sections mostly serve as redirects for people having arrived here following outdated links.

### Server Only

See [@instana/collector Server Only section](packages/collector/README.md#server-only).

### Installation and Usage

See [@instana/collector Installation and Usage](packages/collector/README.md#installation-and-usage).

### CPU Profiling, Garbage Collection and Event Loop Information

See [@instana/collector Native Extensions section](packages/collector/README.md#cpu-profiling-garbage-collection-and-event-loop-information).

### API

See [@instana/collector API](packages/collector/API.md).

### OpenTracing

See [@instana/collector OpenTracing API](packages/collector/API.md#opentracing-integration).

### FAQ

See [@instana/collector FAQ](packages/collector/README.md#faq).

#### How can the Node.js collector be disabled for (local) development?

See [@instana/collector](packages/collector/README.md#how-can-the-nodejs-collector-be-disabled-for-local-development).

### To use test_server_start branch for development

Clone the modified version (test_server_start) into a different project directory, then do the following 

1) cd to "packages" directory and then in core and collector directories: npm link
3) Then go back to the project to be instrumented, and in the root directory cd to node_modules directory, and do the following:

npm link @instana/collector
npm link @instana/core

4) In project root directory open package.json and add the line to dependencies:

"@instana/collector": "^1.71.1",

5) Then go to the place in the project's code where the very first line of code is executed when the project starts and before it add the following:

const instana = require('@instana/collector');
instana({
  agentPort: 3000,
  reportUncaughtException: true
});

6) Go to a separate directory and issue the following:

npx http-echo-server

7) Now go back to project directory and do: npm start

The output in http-echo-server should show metrics information gathered from your running application.
 

 
