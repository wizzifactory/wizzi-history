/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\store\configurestore.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./configureStore.prod');
}
else {
    module.exports = require('./configureStore.dev');
}
