/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\server.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
var randomstring = require("randomstring");
process.env.PROCESS_ENCRYPTION_KEY = randomstring.generate(32);
var config = require('./config');
var serverApp = require('./serverApp');
var chalk = require('chalk');
function initServerApp(callback) {
    if (typeof callback == 'undefined') {
        throw new Error('wizzi-studio/server/start error: a callback function is required');
    }
    console.log('initServerApp');
    var initResult = {};
    // Initialize serverApp
    console.log('calling serverApp.init');
    serverApp.init(initResult, function(err, app) {
        if (err) {
            return callback(error(err));
        }
        callback(null, app, initResult, config);
    });
}
/**
     Start server
*/
module.exports.start = function start(callback) {
    if (typeof callback == 'undefined') {
        throw new Error('wizzi-studio/server/start error: a callback function is required');
    }
    initServerApp(function(err, app, db, config) {
        if (err) {
            return callback(err);
        }
        app.listen(config.port, function() {
            console.log('--');
            console.log(chalk.green(config.app.title))
            console.log(chalk.green('Environment:\t' + process.env.NODE_ENV))
            console.log(chalk.green('Port:\t\t' + config.port))
            if (process.env.NODE_ENV === 'secure') {
                console.log(chalk.green('HTTPs:\ton'))
            }
            console.log('--');
            return callback(null, app, db, config);
        });
        });
};
