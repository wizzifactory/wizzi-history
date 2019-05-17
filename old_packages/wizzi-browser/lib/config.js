/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\lib\config.js.ittf
*/
'use strict';
/** -àà
     TODO eliminate this
    
     Config properties can be changed during the startup of the runnerServer,
     using the onConfig method of a wizzifile.js.
    
     property wfBaseFolder
     property wfJobsFolder
    
*/
var path = require('path');
var md = module.exports = {};
md.wfBaseFolder = 'c:/my/wizzi/v3';
md.wfJobsFolder = path.join(md.wfBaseFolder, 'wfjobs');
md.get = function(key, defaultValue) {
    if (typeof(md[key]) === 'undefined' && typeof(defaultValue) !== 'undefined') {
        return defaultValue;
    }
    else {
        return md[key];
    }
};
md.set = function(key, value) {
    md[key] = value;
    onChange();
};
function onChange() {
    md.wfJobsFolder = path.join(md.wfBaseFolder, 'wfjobs');
}
