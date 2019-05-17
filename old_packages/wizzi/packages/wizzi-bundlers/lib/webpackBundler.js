/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-bundlers\wizzi\ittf\src\lib\webpackbundler.js.ittf
*/
'use strict';
var path = require('path');
var webpack = require("webpack");
var wizziWebpackLoader = require('./wizziWebpackLoader');
var md = module.exports = {};
md.makeBundle = function(filePath, options, callback) {
    var outputPath = options.outputPath || path.resolve(path.dirname(filePath), '..', 'scripts');
    var outputFileName = options.outputFileName || 'bundle.js';
    var SRC_PATH = path.dirname(filePath);
    var NODE_MODULES_PATH = path.dirname(filePath);
    var compiler = webpack({
        mode: 'development', 
        entry: {
            file: filePath
        }, 
        output: {
            path: outputPath, 
            filename: outputFileName
        }, 
        resolve: {
            extensions: ['.js.ittf','.js']
        }, 
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/, 
                    exclude: /node_modules/, 
                    use: [
                        {
                            loader: "babel-loader", 
                            options: {
                                presets: [
                                    "@babel/env", 
                                    "@babel/react"
                                ]
                            }
                        }
                    ]
                }, 
                {
                    test: /\.(js.ittf)$/, 
                    exclude: /node_modules/, 
                    use: [
                        {
                            loader: "babel-loader", 
                            options: {
                                presets: [
                                    "@babel/env", 
                                    "@babel/react"
                                ]
                            }
                        }, 
                        {
                            loader: path.join(__dirname, 'wizziWebpackLoader.js'), 
                            options: {
                                
                            }
                        }
                    ]
                }
            ]
        }
    });
    compiler.run((err, stats) => {
        if (err) {
            return callback(err);
        }
        if (stats.hasErrors()) {
            return callback(stats);
        }
        return callback(null, stats);
    });
};
var WizziResolver = {
    apply: function(resolver) {
        resolver.plugin('module', function(request, callback) {
            console.log('WizziResolver.request', request);
            callback();
        });
    }
};
