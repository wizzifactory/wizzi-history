/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi\src\ittf\tests\mocks\definitions.js.ittf
*/
'use strict';
var md = module.exports = {};
md.getSchemaDefinition = function(schemaName) {
    if (schemaName === 'tests') {
        return {
                name: 'tests'
            };
    }
    else {
        return null;
    }
};
