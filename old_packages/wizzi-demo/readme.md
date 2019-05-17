
<p align="center"><a rel="noopener" target="_blank" href="https://wizzifactory.github.io"><img width="450" src="https://wizzifactory.github.io/images/logo.svg" alt="Wizzi"></img></a></p>

# Wizzi demo
The official examples to get started with the wizzi factory.
## Installation
The wizzi demo is available as an [npm package](https://www.npmjs.com/package/wizzi-demo).
```sh
npm install wizzi-demo
```
A setup script must be run.
```sh
npm run setup
```
## Usage
```sh
node index all|se|sa|ae|ap
# se = starter-essentials
# sa = starter-apps
# ae = advanced-essentials
# ap = advanced-plugins
```
## Starter
These examples use the default factory for a quick start.
The default factory is an internally configured factory, that uses a `filesystem` store and has three pre-loaded plugins: `wizzi-core`, `wizzi-js` and `wizzi-web`. It is a starter factory to play with, that targets common web technologies.
### Essentials
Contains [examples](https://github.com/wizzifactory/wizzi-demo/tree/master/starter/essentials) of essential methods of the wizzi factory API.
### Apps
Contains [examples](https://github.com/wizzifactory/wizzi-demo/tree/master/starter/apps) of using the default factory to build react/redux single page apps.
## Advanced
### Essentials
[This section](https://github.com/wizzifactory/wizzi-demo/tree/master/advanced/essentials) shows how to configure a wizzi factory instance with plugins and document stores of your choice, to accomplish essential tasks.
You will use the `filesystem`, `mongodb` and `jsonfs` document stores.
#### Plugins
Explains how to create new [plugins](https://github.com/wizzifactory/wizzi-demo/tree/master/advanced/plugins).
