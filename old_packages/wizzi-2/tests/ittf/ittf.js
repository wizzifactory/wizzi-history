/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\tests\ittf\ittf.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var file = require('../../lib/util/file');
var stringify = require('json-stringify-safe');
var ittf = require('../../lib/ittf/ittf');
var result;
describe("ittf loads an IttfModel from an IttfDocument", function() {
    before(function(done) {
        ittf.load(path.join(__dirname, 'repo', 'data', 'ittf_object_args.tests.ittf')
        , {
            items: [
                {
                    name: 'stefi', 
                    value: 60
                }, 
                {
                    name: 'annie', 
                    value: 59
                }, 
                {
                    name: 'afro', 
                    value: 98
                }
            ]
        }, function(err,ittfModel) {
            result = ittfModel;
            file.write(path.join(__dirname, 'repo', 'data', 'ittf_object_args.json')
            , stringify(ittfModel, null, 2)
            );
            done();
        });
    });
    it("should load", function() {
        expect(result).to.be.an('object');
    });
});
