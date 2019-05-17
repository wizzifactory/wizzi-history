/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\next\sources\webpacks\cssstyle\ittf\webpacks\cssstyle\src\store\configurestore.js.ittf
    utc time: Wed, 19 Jul 2017 08:08:01 GMT
*/
'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./configureStore.prod');
}
else {
    module.exports = require('./configureStore.dev');
}
