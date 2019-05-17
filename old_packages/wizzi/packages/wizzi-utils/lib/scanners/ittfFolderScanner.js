/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-utils\src\ittf\lib\scanners\ittffolderscanner.js.ittf
*/
'use strict';
var path = require('path');
var file = require('../fs/file');
var IttfMTreeEx = require('../ittfTree/ittfMTreeEx');
var IttfFsNode = require('./ittfFsNode');
// TODO repository store agnostic (defaults to filesystems)
var md = module.exports = {};
/** -àà
    
     Scans a folder searching for *.ittf files
     Returns a wizzi.utils.IttfMTreeEx instance
     loaded with an mTree conformant to the
     'wzpackage' schema.
    
     params
     string folderPath
     { options
     string name
     # the name of the 'wzpackage' wizzi model that
     # will be generated from this folder
     string gitPath
     # the base path to the 'main' generated artifact
     # in the future, could be used for linking the ittf document
     # of a language type to the generated code.
    
*/
