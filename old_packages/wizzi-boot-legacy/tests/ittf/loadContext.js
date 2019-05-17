// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Thu, 23 Mar 2017 19:16:25 GMT
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var LoadContext = require('../../lib/ittf/loadContext');
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
