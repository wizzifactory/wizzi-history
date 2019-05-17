/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\examples\fs\uriparser.js.ittf
*/
'use strict';
var path = require('path');
var uriParser = require('../../lib/fs/uriParser');
parse('\\tmp\\stefi\\wizzi\\index.js.ittf');
parse('/tmp/stefi/wizzi/index.js.ittf');
parse('c:\\stefi\\wizzi\\index.js.ittf');
parse('db:\\stefi\\wizzi\\index.js.ittf');
parse('ls:\\stefi\\wizzi\\index.js.ittf');
parse('c:/stefi/wizzi/index.js.ittf');
parse('db:/stefi/wizzi/index.js.ittf');
parse('ls:/stefi/wizzi/index.js.ittf');
parse('c://stefi/wizzi/index.js.ittf');
parse('db://stefi/wizzi/index.js.ittf');
parse('ls://stefi/wizzi/index.js.ittf');
function parse(uri) {
    var parsed = uriParser(uri);
    console.log(uri, '\n', path.dirname(uri), '\n', JSON.stringify(parsed, null, 2));
}
