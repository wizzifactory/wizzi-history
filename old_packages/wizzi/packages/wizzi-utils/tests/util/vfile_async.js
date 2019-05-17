/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\tests\util\vfile_async.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('../../lib/fs/file');
var verify = require('../../lib/verify');

var async = require('async');
var vfile = require('../../lib/fs/vfile');
var file = vfile();
var glob = require('../../lib/glob');

describe("vfile", function() {
    before(function() {
        del.sync([
            path.join(__dirname, 'ittf')
        ], {
            force: true
        });
    });
    it("should async create the first file in the ittf folder", function(done) {
        file.write(path.join(__dirname, 'ittf', 'gc_one.ittf'), 'first one\nsecond one', function(err, result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            file.write(path.join(__dirname, 'ittf', 'folder_one', 'gc_two.ittf'), 'first one\nsecond one', function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                done();
            });
        });
    });
    it("should async check existence of file", function(done) {
        file.exists(path.join(__dirname, 'ittf', 'gc_one.ittf'), function(err, exists) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            expect(exists).to.be(true);
            file.exists(path.join(__dirname, 'ittf', 'astrumb.ittf'), function(err, exists) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                expect(exists).to.be(false);
                file.isFile(path.join(__dirname, 'ittf', 'gc_one.ittf'), function(err, isFile) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err.message);
                    }
                    expect(isFile).to.be(true);
                    file.isFile(path.join(__dirname, 'ittf', 'astrumb.ittf'), function(err, isFile) {
                        if (err) {
                            console.log('err', err);
                            throw new Error(err.message);
                        }
                        expect(isFile).to.be(false);
                        file.isFile(path.join(__dirname, 'ittf', 'folder_one'), function(err, isFile) {
                            if (err) {
                                console.log('err', err);
                                throw new Error(err.message);
                            }
                            expect(isFile).to.be(false);
                            file.isDirectory(path.join(__dirname, 'ittf', 'gc_one.ittf'), function(err, isDirectory) {
                                if (err) {
                                    console.log('err', err);
                                    throw new Error(err.message);
                                }
                                expect(isDirectory).to.be(false);
                                done();
                            });
                        });
                    });
                });
            });
        });
    });
    it("should async check existence of folder", function(done) {
        file.exists(path.join(__dirname, 'ittf', 'folder_one'), function(err, exists) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            expect(exists).to.be(true);
            file.exists(path.join(__dirname, 'ittf', 'folder_astrumb'), function(err, exists) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                expect(exists).to.be(false);
                file.isDirectory(path.join(__dirname, 'ittf', 'folder_one'), function(err, isDirectory) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err.message);
                    }
                    expect(isDirectory).to.be(true);
                    file.isDirectory(path.join(__dirname, 'ittf', 'astrumb.ittf'), function(err, isDirectory) {
                        if (err) {
                            console.log('err', err);
                            throw new Error(err.message);
                        }
                        expect(isDirectory).to.be(false);
                        file.isFile(path.join(__dirname, 'ittf', 'folder_one'), function(err, isFile) {
                            if (err) {
                                console.log('err', err);
                                throw new Error(err.message);
                            }
                            expect(isFile).to.be(false);
                            done();
                        });
                    });
                });
            });
        });
    });
    it("should async create folder", function(done) {
        file.mkdir(path.join(__dirname, 'ittf', 'folder_created_one'), function(err, result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            file.isDirectory(path.join(__dirname, 'ittf', 'folder_created_one'), function(err, isDirectory) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                expect(isDirectory).to.be(true);
                file.mkdir(path.join(__dirname, 'ittf', 'folder_created_one', 'alfa', 'beta'), function(err, result) {
                    if (err) {
                        console.log('err', err);
                        throw new Error(err.message);
                    }
                    file.isDirectory(path.join(__dirname, 'ittf', 'folder_created_one', 'alfa', 'beta'), function(err, isDirectory) {
                        if (err) {
                            console.log('err', err);
                            throw new Error(err.message);
                        }
                        expect(isDirectory).to.be(true);
                        done();
                    });
                });
            });
        });
    });
    it("should async write/read a file", function(done) {
        file.write(path.join(__dirname, 'ittf', 'gc_one.ittf'), 'first one\nsecond one', function(err, result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            file.read(path.join(__dirname, 'ittf', 'gc_one.ittf'), function(err, contents) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                expect(contents).to.be.a('string');
                expect(contents).to.be('first one\nsecond one');
                done();
            });
        });
    });
    it("should async write/read a file on a new folder", function(done) {
        file.write(path.join(__dirname, 'ittf', 'alca', 'traz', 'gc_one.ittf'), 'first one\nsecond one', function(err, result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            file.read(path.join(__dirname, 'ittf', 'alca', 'traz', 'gc_one.ittf'), function(err, contents) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                expect(contents).to.be.a('string');
                expect(contents).to.be('first one\nsecond one');
                done();
            });
        });
    });
    it("should async write/read a json file", function(done) {
        var obj = {
            name: 'stefi', 
            friends: [
                {
                    name: 'arth'
                }, 
                {
                    name: 'marilu'
                }
            ]
        };
        file.writeJSON(path.join(__dirname, 'ittf', 'abrac.json'), obj, function(err, result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            file.readJSON(path.join(__dirname, 'ittf', 'abrac.json'), function(err, obj_read) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                // loose equality works for objects
                expect(obj).to.eql(obj_read);
                done();
            });
        });
    });
    it("should async get files in a basefolder", function(done) {
        file.write(path.join(__dirname, 'ittf', 'globs', 'globbed_1.ittf'), 'globbed 1');
        file.write(path.join(__dirname, 'ittf', 'globs', 'globbed_2.ittf'), 'globbed 2');
        file.getFiles(path.join(__dirname, 'ittf', 'globs'), {
            deep: false, 
            extension: null, 
            documentContent: false
        }, function(err, files) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            console.log('should get files in a basefolder - files', files);
            expect(files).to.be.an('array');
            expect(files.length).to.be(2);
            done();
        });
    });
    it("should get async files with content in a basefolder", function(done) {
        file.getFiles(path.join(__dirname, 'ittf', 'globs'), {
            deep: false, 
            extension: null, 
            documentContent: true
        }, function(err, files) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            expect(files).to.be.an('array');
            expect(files.length).to.be(2);
            expect(files[0].content).to.be.a('string');
            expect(files[0].content).to.be('globbed 1');
            expect(files[0].relPath).to.be.a('string');
            expect(files[0].relPath).to.be('globbed_1.ittf');
            expect(files[1].content).to.be.a('string');
            expect(files[1].content).to.be('globbed 2');
            expect(files[1].relPath).to.be.a('string');
            expect(files[1].relPath).to.be('globbed_2.ittf');
            done();
        });
    });
    it("should async get folders in a basefolder", function(done) {
        file.write(path.join(__dirname, 'ittf', 'globs', 'one', 'globbed_1.ittf'), 'globbed 1');
        file.write(path.join(__dirname, 'ittf', 'globs', 'two', 'globbed_2.ittf'), 'globbed 2');
        file.getFolders(path.join(__dirname, 'ittf', 'globs'), {
            deep: false, 
            tFoldersOnly: false, 
            documentNames: false
        }, function(err, folders) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            console.log('folders', folders);
            expect(folders).to.be.an('array');
            expect(folders.length).to.be(2);
            done();
        });
    });
    it("should async get folders in a basefolder deep", function(done) {
        file.write(path.join(__dirname, 'ittf', 'globs', 'one', 'deep', 'globbed_1deep.ittf'), 'globbed 1 deep');
        file.write(path.join(__dirname, 'ittf', 'globs', 'two', 'deep', 'globbed_2deep.ittf'), 'globbed 2 deep');
        file.getFolders(path.join(__dirname, 'ittf', 'globs'), {
            deep: true, 
            tFoldersOnly: false, 
            documentNames: false
        }, function(err, folders) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            console.log('folders', folders);
            expect(folders).to.be.an('array');
            expect(folders.length).to.be(4);
            expect(folders[0].relPath).to.be.a('string');
            expect(folders[0].relPath).to.be('one');
            expect(folders[1].relPath).to.be.a('string');
            expect(folders[1].relPath).to.be('two');
            expect(folders[2].relPath).to.be.a('string');
            expect(folders[2].relPath).to.be('one/deep');
            expect(folders[3].relPath).to.be.a('string');
            expect(folders[3].relPath).to.be('two/deep');
            done();
        });
    });
    it("should async get folders in a basefolder deep with document names", function(done) {
        file.write(path.join(__dirname, 'ittf', 'globs', 'one', 'deep', 'globbed_1deep.ittf'), 'globbed 1 deep');
        file.write(path.join(__dirname, 'ittf', 'globs', 'two', 'deep', 'globbed_2deep.ittf'), 'globbed 2 deep');
        file.getFolders(path.join(__dirname, 'ittf', 'globs'), {
            deep: true, 
            tFoldersOnly: false, 
            documentNames: true
        }, function(err, folders) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            console.log('');
            console.log('');
            console.log('*** folders', folders);
            expect(folders).to.be.an('array');
            expect(folders.length).to.be(4);
            expect(folders[0].documents).to.be.an('array');
            expect(folders[0].documents.length).to.be(1);
            expect(folders[1].documents).to.be.an('array');
            expect(folders[1].documents.length).to.be(1);
            expect(folders[2].documents).to.be.an('array');
            expect(folders[2].documents.length).to.be(1);
            expect(folders[3].documents).to.be.an('array');
            expect(folders[3].documents.length).to.be(1);
            done();
        });
    });
    it("should async glob a folder", function(done) {
        file.write(path.join(__dirname, 'ittf', 'globs2', 'globbed_1.ittf'), 'globbed 1');
        file.write(path.join(__dirname, 'ittf', 'globs2', 'globbed_2.ittf'), 'globbed 2');
        file.write(path.join(__dirname, 'ittf', 'globs2', 'one', 'globbed_2_one.ittf'), 'globbed 2 one');
        file.getGlobbedFilesEx(path.join(__dirname, 'ittf', 'globs2', '**/*.ittf'), file, function(err, result) {
            if (err) {
                console.log('err', err);
                throw new Error(err.message);
            }
            expect(result).to.be.an('array');
            expect(result.length).to.be(3);
            file.getGlobbedFilesEx(path.join(__dirname, 'ittf', 'globs2', '**/*.ittf'), {
                removeRoot: path.join(__dirname, 'ittf')
            }, function(err, result) {
                if (err) {
                    console.log('err', err);
                    throw new Error(err.message);
                }
                expect(result).to.be.an('array');
                expect(result.length).to.be(3);
                expect(result[0]).to.be.a('string');
                expect(result[0]).to.be('/globs2/globbed_1.ittf');
                done();
            });
        });
    });
});
