/*
    artifact generator: C:\My\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-demo\src\ittf\examples\advanced\essentials\filesystem\artifacts\localplugin\flow\index.js.ittf
*/
'use strict';
var build = require('./source/generate');
function exec(callback) {
    build(callback);
}
module.exports = function(callback) {
    exec(callback);
};
if (require.main === module) {
    exec();
}
