// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:16:22 GMT
'use strict';
var fs = require('fs');
var path = require('path');
var lexer = require('../lib/ittf/lexer');
var parser = require('../lib/ittf/parser');
var file = require('../lib/util/file');
var IttfModel = require('../lib/ittf/ittfModel');
var LoadContext = require('../lib/ittf/loadContext');
var uri = 'C:/My/wizzi/wizzi-npm/npm-wizzi-lab-data/ittf/lib/artifacts/raml/nodejs_server/gen/ittf__copy/t/common/errors.js.ittf';
var documentTextContent = file.read(uri);
var loadContext = new LoadContext();
var lines = lexer(documentTextContent, {})
;
file.openWrite(path.join(__dirname, 'ittf', 'check_1.lexer.lines.txt')
, function(err,stream) {
    if (err) {
        console.log('error', err);
        return ;
    }
    var i, i_len=lines.length, line;
    for (i=0; i<i_len; i++) {
        line = lines[i];
        stream.write(line.name + ' ' +line.value + ' ' +line.indent +'\n');
    }
    stream.end();
});
loadContext.addIttfDocument(uri, documentTextContent);
var ittfDocumentData = loadContext.addIttfModel(uri, 'js', null, {
    from: 'store', 
    ittfDocumentUri: uri, 
    include: false, 
    includerModelKey: null, 
    basedir: null, 
    relpath: null
})
;
var newIttfModel = new IttfModel(uri, loadContext);
newIttfModel.load(documentTextContent, ittfDocumentData);
file.write(path.join(__dirname, 'ittf', 'check_1.parser.nodes.txt')
, newIttfModel.dump(false));
