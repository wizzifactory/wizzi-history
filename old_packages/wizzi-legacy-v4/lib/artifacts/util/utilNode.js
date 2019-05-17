/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-html\src\ittf\lib\artifacts\util\utilnode.js.ittf
    utc time: Wed, 11 Oct 2017 11:41:46 GMT
*/
'use strict';

var verify = require('./verify');

var work = {};
work.lineSep = "__LS__";
work.textSep = "__TS__";

var md = module.exports = {};
md.lineToText = function(text) {
    if (typeof(text) === 'undefined' || text == null) {
        return {
                text: text, 
                lines: null
            };
    }
    var text = verify.replaceAll(text, work.textSep, '\n')
    ;
    var ss = text.split('\n');
    if (ss.length == 1) {
        return {
                text: ss[0], 
                lines: null
            };
    }
    else {
        var lines = verify.replaceAll(ss[1], work.lineSep, '\n').split('\n')
        ;
        return {
                text: ss[0], 
                lines: lines
            };
    }
};
