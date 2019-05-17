/*
    artifact generator: C:\My\wizzi\v4\node_modules\v4-wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v4\plugins\wizzi-codegen\src\ittf\tests\mocks\index.js.ittf
    utc time: Wed, 11 Oct 2017 11:02:31 GMT
*/
'use strict';

var loader = require('./basicloader');
var file = require('./basicloader/file');
var errors = require('./errors');

var md = module.exports = {};
md.getFactoryWizziObject = function() {
    return {
            loadMTree: loader.loadMTree, 
            file: file, 
            errors: errors
        };
};
md.genContext = require('./artifact/genContext');
md.basicLoader = loader;
md.file = file;
md.jsNode = require('./jsmodel/jsnode');
md.verify = require('./util/verify');
