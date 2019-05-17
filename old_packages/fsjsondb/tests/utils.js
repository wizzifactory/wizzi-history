// generator: /wizzi-labs/wizzi-lab-site/ittf/lib/artifacts/js/module/gen/main.js, utc time: Wed, 01 Feb 2017 14:56:33 GMT
'use strict';
var expect = require('expect');
var _ = require('../lib/utils');
var parsed;
describe("utils.keys", function() {
    it("should extract an array of property names from an object or [] if null or undefined", function() {
        var r1 = _.keys({
            name: 'stefi', 
            email: 'stefi@tau.org'
        })
        ;
        var r2 = _.keys();
        expect(r1.length).toBe(2);
        expect(r1[0]).toBe('name');
        expect(r1[1]).toBe('email');
        expect(r2.length).toBe(0);
    });
});
describe("utils.extractKey", function() {
    it("should extract an object key from an array of key names and an object", function() {
        var objkey = _.extractKey([
            'name'
        ], {
            name: 'stefi', 
            email: 'stefi@tau.org'
        })
        ;
        expect(objkey.name).toBe('stefi');
    });
});
