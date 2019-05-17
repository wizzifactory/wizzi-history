/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\wizzifile.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
var util = require('util');
var path = require('path');
var chokidar = require('chokidar');
var serverConfig = require('./config');
var FACTORY_SITE = 'site';
var MODEL_TICKET_MAINSITE = 'mainsite';
console.log('serverConfig', serverConfig);
var md = module.exports = {};
md.models = {};
var runnerServerInstance = null;
var runnerModelsFolder = path.join(__dirname, 'ittf', 'meta', 'models');
var watcher = chokidar.watch(runnerModelsFolder + '/**/*.ittf', {
    persistent: true
});
md.onConfig = function(wizziConfig, callback) {
    /**
         Set the path of the html page
         for metaediting of IttfDocuments
    */
    wizziConfig.set('meta-html-ittf-path', path.join(__dirname, 'ittf', 'meta', 'html', 'index.html.ittf'));
    /**
         Set the path of the html page
         for browsing an ittf folder path
    */
    wizziConfig.set('meta-folder-ittf-path', path.join(__dirname, 'ittf', 'meta', 'folder', 'index.html.ittf'));
    /**
         Set the path of the html page
         for simple text editing of non IttfDocuments
    */
    wizziConfig.set('meta-html-text-path', path.join(__dirname, 'ittf', 'meta', 'text', 'index.html.ittf'));
    console.log('wizzifile.onConfig');
    callback(null);
};
md.onStart = function(runnerServer, wizziConfig, callback) {
    console.log('wizzifile.onStart.enter');
    runnerServerInstance = runnerServer;
    runnerServer.registerFsNoAclFactory(FACTORY_SITE, {
        plugins: {
            pluginsBaseFolder: __dirname, 
            items: [
                'wizzi-web'
            ]
        }
    });
    runnerServer.registerApi('default', md.defaultApi);
    console.log('wizzifile.onStart.exit');
    callback(null);
};
md.onPrepare = function(factoryName, runnerServer, wizziConfig, callback) {
    console.log('wizzifile.onPrepare.enter.factoryName', factoryName);
    if (factoryName === FACTORY_SITE) {
        loadRuntimeModels(function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            var loading = false;
            watcher.on('all', () =>
                loadRuntimeModels());
            return callback();
        });
    }
    else {
        callback(null);
    }
};
md.defaultApi = function(name, query) {
    console.log('wizzifile.defaultApi.request', name, query);
    if (name === 'demos') {
        var model = md.models['mainsite'];
        return model.getDemosByPath(query);
    }
    if (name === 'categories') {
        var model = md.models['mainsite'];
        return model.getCategoriesByPath(query);
    }
    if (name === 'links') {
        var model = md.models['mainsite'];
        return model.getLinksByPath(query);
    }
    throw new Error('wizzifile.defaultApi. Unknown api name: ' + name);
};
function loadRuntimeModels(callback) {
    var mainSiteIttfPath = path.join(runnerModelsFolder, 'main.site.ittf');
    console.log('wizzifile loading', mainSiteIttfPath);
    runnerServerInstance.loadModel(FACTORY_SITE, MODEL_TICKET_MAINSITE, 'site', mainSiteIttfPath, {}, function(err, wizziModel) {
        if (err) {
            return callback(err);
        }
        md.models[MODEL_TICKET_MAINSITE] = wizziModel;
        console.log('wizzifile loaded', mainSiteIttfPath);
        if (callback) {
            callback(null);
        }
    });
}
