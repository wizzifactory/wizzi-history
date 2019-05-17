/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\config.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
var path = require('path');
var md = module.exports = {};
md.wfBaseFolder = 'c:/my/wizzi/next';
md.wfJobsFolder = path.join(md.wfBaseFolder, 'wfjobs')
;
md.get = function(key,defaultValue) {
    if (typeof(md[key]) === 'undefined' && typeof(defaultValue) !== 'undefined') {
        return defaultValue;
    }
    else {
        return md[key];
    }
};
md.set = function(key,value) {
    md[key] = value;
    onChange();
};
function onChange() {
    md.wfJobsFolder = path.join(md.wfBaseFolder, 'wfjobs')
    ;
}

