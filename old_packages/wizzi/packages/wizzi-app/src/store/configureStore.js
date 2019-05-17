/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\store\configurestore.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
if (process.env.NODE_ENV === 'production') {
    module.exports = require('./configureStore.prod');
}
else {
    module.exports = require('./configureStore.dev');
}
