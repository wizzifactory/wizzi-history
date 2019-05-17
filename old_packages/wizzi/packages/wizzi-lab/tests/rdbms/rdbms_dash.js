/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\plugins\wizzi-lab\src\ittf\tests\rdbms\rdbms_dash.js.ittf
    utc time: Sat, 22 Sep 2018 10:57:57 GMT
*/
'use strict';

var path = require('path');
var util = require('util');

var expect = require('expect.js');
var thisPackageIndex = require('../../index');
describe("loading the dash rdbms WizziModel", function() {
    it("should load the WizziModel", function(done) {
        thisPackageIndex.rdbms(path.join(__dirname, 'ittf', 'dash.rdbms.ittf'), {}, function(err, wizziModel) {
            // log 'dash.rdbms.wizziModel', wizziModel
            expect(wizziModel).to.be.an('object');
            done();
        });
    });
});
