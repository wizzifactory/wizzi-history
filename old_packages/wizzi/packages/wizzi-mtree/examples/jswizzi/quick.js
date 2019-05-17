/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-mtree\src\ittf\examples\jswizzi\quick.js.ittf
*/
'use strict';
var JsWizziContext = require('../../lib/jswizzi/jsWizziContext');
var jsWizziRunner = require('../../lib/jswizzi/jsWizziRunner');
var result = runExpression('var x = { a: "b" }; var y = x.a; return x.b;');
console.log('result', result);
function runExpression(code) {
    // without ctor arguments means: isForInterpolation
    var jsWizziContext = new JsWizziContext();
    // run the expression embedded in a var declaration 'result'
    var statements = code.indexOf('return ') > -1 ? 'var result = function dummy() { ' + code + ' }();' : 'var result = ' + code + ';';
    var hr = jsWizziRunner.run(statements, jsWizziContext, {
        verbose: false
    });
    if (hr && hr.__is_error) {
        throw new Error(hr);
    }
    // return the 'result' var from the context
    return {
            statements: statements, 
            result: jsWizziContext.getValue('result')
        };
}
