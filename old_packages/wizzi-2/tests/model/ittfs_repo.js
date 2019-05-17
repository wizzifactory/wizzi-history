/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\v2\sources\wizzi-2-boot\ittf\tests\model\ittfs_repo.js.ittf
    utc time: Tue, 11 Jul 2017 17:02:25 GMT
*/
'use strict';
var path = require('path');
var expect = require('expect.js');
var del = require('del');
var ittfs = require('../../lib/ittf/fs');
var basepath = 'repo:/stefi/wizzitest';
describe("ittfs repo utility", function() {
    before(function(done) {
        var repo_FS = require('wizzi-mongodb').Filesystem;
        repo_FS.mount('mongodb://localhost:27017/test', 'c://users', function(err,notUsed) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            console.log('ittfs repo before', err, notUsed);
            done();
        });
    });
    it("should not find unexistants", function(done) {
        var item = path.join(basepath, 'items', 'item.js.ittf')
        ;
        ittfs.exists(item, function(err,result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            expect(result).to.be(false);
            ittfs.isDirectory(item, function(err,result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                expect(result).to.be(false);
                ittfs.isFile(item, function(err,result) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err.message);
                    }
                    expect(result).to.be(false);
                    done();
                });
            });
        });
    });
    it("should create a new folder", function(done) {
        var folder = path.join(basepath, 'folders', 'folderOne')
        ;
        ittfs.mkdir(folder, function(err,result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            ittfs.exists(folder, function(err,result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                expect(result).to.be(true);
                ittfs.isDirectory(folder, function(err,result) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err.message);
                    }
                    expect(result).to.be(true);
                    ittfs.isFile(folder, function(err,result) {
                        if (err) {
                            console.log('err', err);
                            throw new Error(err.message);
                        }
                        expect(result).to.be(false);
                        done();
                    });
                });
            });
        });
    });
    it("should write a new ittfs", function(done) {
        var filepath = path.join(basepath, 'folders', 'folderTwo', 'item.js.ittf')
        ;
        ittfs.write(filepath, 'Hello world', function(err,result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            ittfs.exists(filepath, function(err,result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                expect(result).to.be(true);
                ittfs.isDirectory(filepath, function(err,result) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err.message);
                    }
                    expect(result).to.be(false);
                    ittfs.isFile(filepath, function(err,result) {
                        if (err) {
                            console.log('err', err);
                            throw new Error(err.message);
                        }
                        expect(result).to.be(true);
                        ittfs.read(filepath, function(err,result) {
                            if (err) {
                                console.log('err', err);
                                throw new Error(err.message);
                            }
                            expect(result).to.be.a('string');
                            expect(result).to.be('Hello world');
                            done();
                        });
                    });
                });
            });
        });
    });
    it("should copy a file", function(done) {
        var source = path.join(basepath, 'folders', 'folderTwo', 'item.js.ittf')
        ;
        var dest = path.join(basepath, 'folders', 'folderThree', 'itemcopied.js.ittf')
        ;
        ittfs.copy(source, dest, function(err,result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            ittfs.exists(dest, function(err,result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                expect(result).to.be(true);
                ittfs.isDirectory(dest, function(err,result) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err.message);
                    }
                    expect(result).to.be(false);
                    ittfs.isFile(dest, function(err,result) {
                        if (err) {
                            console.log('err', err);
                            throw new Error(err.message);
                        }
                        expect(result).to.be(true);
                        ittfs.read(dest, function(err,result) {
                            if (err) {
                                console.log('err', err);
                                throw new Error(err.message);
                            }
                            expect(result).to.be.a('string');
                            expect(result).to.be('Hello world');
                            done();
                        });
                    });
                });
            });
        });
    });
    it("should create a complex project folder", function(done) {
        var projectFolder = path.join(basepath, 'folders', 'projectOne')
        ;
        ittfs.write(path.join(projectFolder, 'src', 'index.js.ittf')
        , 'module 1', function(err,result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            ittfs.write(path.join(projectFolder, 'src', 't', 'fragment_1_a.js.ittf')
            , 'Fragment 1_a', function(err,result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                ittfs.write(path.join(projectFolder, 'src', 't', 'fragment_1_b.js.ittf')
                , 'Fragment 1_b', function(err,result) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err.message);
                    }
                    ittfs.write(path.join(projectFolder, 'src', 't', 'deep', 'fragment_1_b_1.js.ittf')
                    , 'Fragment 1_b_1', function(err,result) {
                        if (err) {
                            console.log('err', err);
                            throw new Error(err.message);
                        }
                        ittfs.getGlobbedFiles(path.join(projectFolder, 'src', '**', '*.js.ittf')
                        , function(err,result) {
                            if (err) {
                                console.log('err', err);
                                throw new Error(err.message);
                            }
                            expect(result).to.be.an('array');
                            expect(result.length).to.be(4);
                            done();
                        });
                    });
                });
            });
        });
    });
});
