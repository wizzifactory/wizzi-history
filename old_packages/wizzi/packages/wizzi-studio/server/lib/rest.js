/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi\ittf\server\lib\rest.js.ittf
    utc time: Thu, 06 Dec 2018 17:50:06 GMT
*/
'use strict';
var util = require('util');
var stringify = require('json-stringify-safe');
var wizzi = require('wizzi');
var restParamsCheck = require('./restparamscheck');
var md = module.exports = {};
md.paramsCheck = function(req) {
    return new restParamsCheck.paramsCheck(req);
};
md.sendError = function(res, err, options) {
    options = options || {};
    var code = options.code || 999;
    var errEmit = err;
    // delete errEmit.__is_error
    if (options.format === 'string') {
        if (typeof err !== 'string') {
            err = util.inspect(err, { depth: null });
        }
        errEmit = wizzi.verify.replaceAll(err, '\n', '<br>');
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(stringify({
        status: {
            code: code, 
            error: errEmit
        }
    }, null, 4));
};
md.sendSuccess = function(res, status, data, options) {
    options = options || {};
    var code = options.code || 0;
    var resultEmit = data;
    delete status.__is_success
    status.code = code;
    if (options.format === 'string') {
        if (result) {
            if (typeof result !== 'string') {
                result = util.inspect(result, { depth: null });
            }
            resultEmit = wizzi.verify.replaceAll(result, '\n', '<br>');
        }
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(stringify({
        status: status, 
        data: resultEmit
    }, null, 4));
};
md.sendResult = function(res, err, result, options) {
    if (err) {
        return sendError(res, err, options);
    }
    else {
        return sendSuccess(res, result, options);
    }
};
