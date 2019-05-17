(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.MyHello = factory());
}(this, function () { 'use strict';

    /*
        artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
        primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-bundlers\wizzi\ittf\examples\rollup\step_1\src\foo.js.ittf
    */
    var foo = 'hello world!';

    /*
        artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
        primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-bundlers\wizzi\ittf\examples\rollup\step_1\src\main.js.ittf
    */
    function main() {
            console.log(foo);
        }

    return main;

}));
