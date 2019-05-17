/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi\src\ittf\tests\mocks\generators.js.ittf
*/
'use strict';
var md = module.exports = {};
md.getGenerator = function(generationName) {
    if (generationName === 'tests/gen1') {
        return {
                gen: function(model, genContext, callback) {
                    genContext.write('Hello I am ' + model.wzName + ' artifact from {from}');
                    return callback(null, genContext);
                }
            };
    }
    else {
        return null;
    }
};
