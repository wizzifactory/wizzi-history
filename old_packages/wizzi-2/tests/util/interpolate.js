/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\tests\util\interpolate.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';
var path = require('path');
var expect = require('expect.js');
var interpolate = require('../../lib/util/interpolate');
var contextObject = {
    name: 'stefi', 
    address: {
        via: 'pinco palla', 
        email: 'dummy@mail.it'
    }
};
describe("node interpolate utility", function() {
    it("should interpolate with default delimiters", function() {
        var result = interpolate('My name is {name} i live in via {address.via}', contextObject)
        ;
        expect(result).to.be.a('string');
        expect(result).to.be('My name is stefi i live in via pinco palla');
    });
    it("should interpolate with choosen delimiters", function() {
        var result = interpolate('My name is $(name) my email is $(address.email)', contextObject, {
            delimiter: '$()'
        })
        ;
        expect(result).to.be.a('string');
        expect(result).to.be('My name is stefi my email is dummy@mail.it');
    });
});
