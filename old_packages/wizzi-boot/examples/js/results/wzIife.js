/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\my\wizzi\v1\kernel\wizzi-boot\examples\js\ittf\wzIife.js.ittf
    utc time: Tue, 11 Jul 2017 11:56:16 GMT
*/
'use strict';
var __wz = (function() {
    var res = {};
    res["util"] = require("util");
    return {
        require: function(name) {
            return res[name];
        }
    }
})();
var spec = (function(__) {
    var util = __.require("util");
    function getGreet() {
        return 'hello';
    }
    function sayHello(name) {
        console.log(getGreet() + ' ' + _.inspect(name));
    }
    return {
        sayHello: sayHello
    };
})(__wz);

spec.sayHello('stefi');
console.log('spec.getGreet: ', spec.getGreet);
