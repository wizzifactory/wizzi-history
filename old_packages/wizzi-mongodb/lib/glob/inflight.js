/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\sources\kernel\v3-wizzi-mongodb\ittf\lib\glob\inflight.js.ittf
    utc time: Tue, 18 Jul 2017 17:11:07 GMT
*/
'use strict';
var wrappy = require('wrappy');
var reqs = Object.create(null);
var once = require('./once');
module.exports = wrappy(inflight);
function inflight(key,cb) {
    if (reqs[key]) {
        reqs[key].push(cb);
        return null;
    }
    else {
        reqs[key] = [cb];
        return makeres(key);
    }
}

function makeres(key) {
    return once(function RES() {
            var cbs = reqs[key];
            var len = cbs.length;
            var args = slice(arguments);
            try {
                for (var i = 0; i < len; i++) {
                    cbs[i].apply(null, args);
                }
            } finally {
                if (cbs.length > len) {
                    cbs.splice(0, len);
                    process.nextTick(function() {
                        RES.apply(null, args);
                    });
                }
                else {
                    delete (reqs[key]);
                }
            }
        })
    ;
}

function slice(args) {
    var length = args.length;
    var array = [];
    for (var i = 0; i < length; i++) {
        array[i] = args[i];
    }
    return array;
}

