/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\sources\kernel\v3-wizzi-mongodb\ittf\lib\glob\path-is-absolute.js.ittf
    utc time: Tue, 18 Jul 2017 17:11:07 GMT
*/
'use strict';
function posix(path) {
    return path.charAt(0) === '/';
}

function win32(path) {
    var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
    var result = splitDeviceRe.exec(path);
    var device = (result[1] || '');
    var isUnc = Boolean((device && (device.charAt(1) !== ':')));
    return Boolean((result[2] || isUnc));
}

module.exports = process.platform === 'win32' ? win32 : posix;
module.exports.posix = posix;
module.exports.win32 = win32;
