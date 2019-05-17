/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-bundlers\wizzi\ittf\src\lib\wizziwebpackloader.js.ittf
*/
'use strict';
// see also https://github.com/babel/babel-loader
// for customizing babel-loader
var wizziLoader = require("./wizziLoader");
module.exports = function wizziWebpackLoader(source, map) {
    // log 'this', this
    console.log('this.resourcePath', this.resourcePath);
    this.async();
    var filePath = this.resourcePath;
    wizziLoader.readWizziJsModuleAsync({
        filePath: filePath
    }, (err, result) => {
        if (err) {
            return this.callback(err, null, null);
        }
        else {
            this.callback(null, result.code, null);
        }
    });
};
