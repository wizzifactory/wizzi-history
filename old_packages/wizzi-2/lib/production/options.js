/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\production\options.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:26 GMT
*/
'use strict';
var _ = require('lodash');
var verify = require('../util/verify');
module.exports = function(userdefaults,genoptions) {
    return _.merge({
            isDebug: false, 
            CRLF: '\n', 
            indentSpaces: 4, 
            dotgExtensionPrefix: false
        }, userdefaults || {}, genoptions || {})
    ;
};
