/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\serverapp.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
/**
     Module dependencies.
*/
var util = require('util');
var path = require('path');
var fs = require('fs');
var http = require('http');
var chalk = require('chalk');
var _ = require('lodash');
var glob = require('glob');
var async = require('async');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
// TODO var flash = require('connect-flash')
var compress = require('compression');
var methodOverride = require('method-override');
var cors = require('cors');
/**
     webpack middleware
*/
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
require('dotenv').config();
var config = require('./config');
var ittfengine = require('./middleware/ittf');
var ittfJsResources = require('./ittfJsResources');
var ittfCssResources = require('./ittfCssResources');
var ittfoptions = {
    jsResources: ittfJsResources, 
    cssResources: ittfCssResources
};
/**
     Create express app
*/
module.exports.init = function(options, callback) {
    console.log('express-app-init');
    var app = express();
    var db = null;
    var api = {};
    initLocalVariables(app);
    initMiddleware(app);
    initStaticFolders(app);
    initWebpack(app);
    initSession(app, db);
    initCors(app);
    console.log('calling initApis');
    initApis(app, config, api, init_step_2_CB(app, db, callback));
};
function init_step_2_CB(app, db, callback) {
    return function init_step_2(err) {
            if (err) {
                throw Error('Server launch aborted. Error: ' + err);
            }
            initErrorRoutes(app);
            // TODO extract secure from ./socket.io
            var http = require('http');
            app = http.createServer(app);
            return callback(null, app);
        };
}
function initLocalVariables(app) {
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    if (config.secure && (config.secure.ssl === true)) {
        app.locals.secure = config.secure.ssl;
    }
    if (config.app) {
        app.locals.keywords = config.app.keywords;
        app.locals.googleAnalyticsTrackingID = config.app.googleAnalyticsTrackingID;
    }
    if (config.facebook) {
        app.locals.facebookAppId = config.facebook.clientID;
    }
    if (config.files) {
        app.locals.jsFiles = config.files.client.js;
        app.locals.cssFiles = config.files.client.css;
    }
    app.locals.livereload = config.livereload;
    app.locals.logo = config.logo;
    app.locals.favicon = config.favicon;
    app.use(function(req, res, next) {
        res.locals.host = req.protocol + '://' + req.hostname;
        res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
        next();
    });
}
function initWebpack(app) {
    var webpackConfig;
    getGlobbedFiles(path.join(__dirname, './webpacks/**/*.browser.config.js')).forEach(function(configPath) {
        console.log(chalk.yellow('gobbled webpack config'), chalk.white(path.resolve(configPath)))
        webpackConfig = require(path.resolve(configPath));
        // Use this middleware to set up hot module reloading via webpack.
        const compiler = webpack(webpackConfig);
        app.use(webpackDevMiddleware(compiler, {
            noInfo: true, 
            publicPath: webpackConfig.output.publicPath
        }));
        app.use(webpackHotMiddleware(compiler));
        })
}
function initMiddleware(app) {
    app.set('showStackError', true);
    app.enable('jsonp callback');
    app.use(compress({
        filter: function(req, res) {
            return /json|text|javascript|css|font|svg/.test(res.getHeader('Content-Type'));
        }, 
        level: 9
    }));
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
        app.set('view cache', false);
    }
    else if (process.env.NODE_ENV === 'production') {
        app.locals.cache = 'memory';
    }
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(methodOverride());
    app.use(cookieParser());
    // TODO _ app.use(flash())
}
function initStaticFolders(app, options) {
    // Setting the app router and static folders
    // ATTENTION
    // 'ittfengine' and 'ittfoptions' are var instances that must be declared
    // before the mixin call to 'express-app'
    // Setting express static folder middleware
    console.log('express static folder: /static', path.resolve(__dirname, './static'));
    app.use('/static', express.static(path.resolve(__dirname, './static')));
    // ATTENTION
    // 'ittfengine' and 'ittfoptions' are var instances that must be declared
    // before the mixin call to 'express-app'
    // Setting ittf static folder middleware
    console.log('ittf static folder: /ittf', path.resolve(__dirname, './ittf'));
    app.use('/ittf', ittfengine(path.resolve(__dirname, './ittf'), '/ittf', ittfoptions));
    }
function initSession(app, options) {
    app.use(function(req, res, next) {
        req.user = {
            id: 'stefi'
        };
        next();
    });
    console.log('****** VIA THIS ****** config.sessionSecret', config.sessionSecret);
    app.use(session({
        saveUninitialized: false, 
        resave: false, 
        secret: config.sessionSecret, 
        cookie: {
            maxAge: config.sessionCookie.maxAge, 
            httpOnly: config.sessionCookie.httpOnly, 
            secure: config.sessionCookie.secure && config.secure.ssl
        }, 
        key: config.sessionKey, 
        store: null
    }));
}
function initCors(app) {
    app.use(cors());
}
function initApis(app, config, api, callback) {
    var files = getGlobbedFiles(path.join(__dirname, './apis/*.js'));
    async.map(files, function(apiPath, callback) {
        console.log(chalk.yellow('gobbled api file'), chalk.white(path.resolve(apiPath)))
        require(path.resolve(apiPath))(app, config, api, function(err, notUsed) {
            if (err) {
                return callback(error(err));
            }
            return callback(null);
        })
    }, function(err, result) {
        if (err) {
            return callback(error(err));
        }
        initRoutes(app, api);
        callback(null);
    });
}
function initRoutes(app, api) {
    getGlobbedFiles(path.join(__dirname, './routes/*.js')).forEach(function(routePath) {
        console.log(chalk.yellow('gobbled routing file'), chalk.white(path.resolve(routePath)))
        require(path.resolve(routePath))(app, api);
    })
}
function initErrorRoutes(app) {
    app.use(function(err, req, res, next) {
        if (!(err)) {
            return next();
        }
        console.error(err.stack);
        res.redirect('/server-error');
    });
}
/**
     Get files by glob patterns
*/
function getGlobbedFiles(globPatterns, excludes) {
    // For context switching
    var _this = this;
    // URL paths regex
    var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');
    // The output array
    var output = [];
    // If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function(globPattern) {
            output = _.union(output, _this.getGlobbedFiles(globPattern, excludes));
        });
    }
    else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        }
        else {
            var files = glob.sync(globPatterns);
            if (excludes) {
                files = files.map(function(file) {
                    if (_.isArray(excludes)) {
                        var i, i_items=excludes, i_len=excludes.length, exclude;
                        for (i=0; i<i_len; i++) {
                            exclude = excludes[i];
                            file = file.replace(exclude, '');
                        }
                    }
                    else {
                        file = file.replace(excludes, '');
                    }
                    return file;
                });
            }
            output = _.union(output, files);
            output = _.filter(output, function (item) { return item.indexOf('/_debug') < 0; });
        }
    }
    return output;
}
