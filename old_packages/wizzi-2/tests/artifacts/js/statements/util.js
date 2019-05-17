/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\tests\artifacts\js\statements\util.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';
var path = require('path');
var expect = require('expect.js');
var util = require('../../../../lib/artifacts/js/module/gen/statements/util');
describe("artifact/js/module/statements/util", function() {
    it("should say if is paren enclosed", function() {
        var test = util.isParenEnclosed('(aspera(and)astra)');
        expect(test).to.be(true);
        var test = util.isParenEnclosed('(aspera(and)astra);');
        expect(test).to.be(true);
        var test = util.isParenEnclosed('aspera(and)astra)');
        expect(test).to.be(false);
        var test = util.isParenEnclosed('(aspera(and)astra');
        expect(test).to.be(false);
    });
    it("should unparen", function() {
        var test = util.unparen('(aspera(and)astra)');
        expect(test).to.be.a('string');
        expect(test).to.be('aspera(and)astra');
        test = util.unparen('aspera(and)astra)');
        expect(test).to.be.a('string');
        expect(test).to.be('aspera(and)astra)');
        var test = util.unparen('(aspera(and)astra');
        expect(test).to.be.a('string');
        expect(test).to.be('(aspera(and)astra');
    });
});
