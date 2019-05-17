/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\lib\esprima\functions\dateUtil.js.ittf
    utc time: Tue, 11 Jul 2017 18:50:00 GMT
*/
'use strict';
module.exports = {
    now_GMYHMS: function() {
        var date = new Date();
        return date.getDate() + '/' +
            (date.getMonth() + 1) + '/' +
            date.getFullYear() + ':' +
            date.getHours() + ':' +
            date.getMinutes() + ':' +
            date.getSeconds();
    }
};
