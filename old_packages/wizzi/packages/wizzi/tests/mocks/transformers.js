/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi\src\ittf\tests\mocks\transformers.js.ittf
*/
'use strict';
var md = module.exports = {};
md.getTransformer = function(transformerName) {
    if (transformerName === 'tests/trans1') {
        return {
                trans: function(model, context, callback) {
                    model.__transformed = true;
                    model.testsName = model.wzName;
                    model.contextFrom = context.from;
                    return callback(null, model);
                }
            };
    }
    else {
        return null;
    }
};
