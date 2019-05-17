/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\tests\ittf\loadContext.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var LoadContext = require('../../lib/ittf/loadContext').loadContext;
var loadContext;
describe("the load context keep track of the mixed ittf documents", function() {
    it("adding a source IttfDocument to the loadContext should return a key for retreaving the uri", function() {
        loadContext = new LoadContext();
        var content_filepath = path.join(__dirname, 'repo', 'data', 'lexer_1.tests.ittf')
        ;
        var sourceData = loadContext.addIttfDocument(content_filepath, {})
        ;
        var uri = loadContext.getIttfDocumentUri(sourceData.sourceKey)
        ;
        expect(sourceData.sourceKey).to.be.a('string');
        expect(sourceData.sourceKey).to.be('f1');
        expect(uri).to.be(content_filepath);
    });
});
