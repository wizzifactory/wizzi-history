/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\wizzi-npm\node_modules\wizzi\examples\js\ittf\wzIife.js.ittf
    utc time: Mon, 13 Mar 2017 12:40:15 GMT
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
    var _ = __.require("util");
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
