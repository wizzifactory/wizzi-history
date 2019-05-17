/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\tests\production\glob.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';

var path = require('path');
var util = require('util');
var del = require('del');
var glob = require('glob');

var expect = require('expect.js');
var file = require('../../lib/util/file');
describe("glob examples", function() {
    before(function() {
        del([
            path.join(__dirname, 'glob', '/**/.*')
            
        ]);
        var folder = path.join(__dirname, 'glob')
        ;
        file.write(folder + '/hello.js.ittf');
        file.write(folder + '/a/hello.js.ittf');
        file.write(folder + '/a/b/hello.js.ittf');
        file.write(folder + '/a/b/hello1.ctx.js.ittf');
        file.write(folder + '/a/b/hello2.ctx.js.ittf');
    });
    it("shold glob every file /**/.*", function() {
        var files = file.getGlobbedFilesEx(path.join(__dirname, 'glob', '/**/*.*')
        )
        ;
        expect(files).to.be.an('array');
        expect(files.length).to.be(5);
    });
    it("shold glob only /**/*.ctx.js.ittf", function() {
        var files = file.getGlobbedFilesEx(path.join(__dirname, 'glob', '/**/*.ctx.js.ittf')
        )
        ;
        expect(files).to.be.an('array');
        expect(files.length).to.be(2);
    });
    it("shold glob /**/*.js.ittf but not *.ctx.js.ittf", function() {
        var files = glob.sync(path.join(__dirname, 'glob', '/**/*.js.ittf')
        , {
            ignore: [
                path.join(__dirname, 'glob', '/**/*.ctx.js.ittf')
                
            ]
        })
        ;
        expect(files).to.be.an('array');
        expect(files.length).to.be(3);
    });
});
