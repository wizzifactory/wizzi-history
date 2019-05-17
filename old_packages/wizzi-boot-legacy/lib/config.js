'use strict';
 
var md = module.exports = {};
// defaults
md.wfJobsFolder = 'c:/my/wizzi/wfjobs';
md.get = function (key, defaultValue) {
    if (typeof md[key] === 'undefined' &&
        typeof defaultValue !== 'undefined')
        return defaultValue;
    else
        return md[key];
}
md.set = function (key, value) {
    md[key] = value;
}
