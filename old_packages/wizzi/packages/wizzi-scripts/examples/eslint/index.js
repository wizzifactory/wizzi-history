/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-scripts\src\ittf\examples\eslint\index.js.ittf
*/
'use strict';
// generated by wizzi.codegen.js4.es2015.module
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var path = require('path');
var util = require('util');
var file = require('wizzi-utils').file;
var packageIndex = require('../../index');
var path = require('path');
var codecampPath = 'c:/my/wizzi/v5/codecamps';
// var fileBasename = 'index.js'
var fileBasename = 'compile.js';
var manager = new packageIndex.Manager();
var scriptsConsole = packageIndex.console;
var MockResponse = (function () {
    function MockResponse() {
        _classCallCheck(this, MockResponse);
        this.head = null;
        this.stdout = '';
        this.stderr = '';
        this.opened = true;
    }
    MockResponse.prototype.writeHead = function(retcode, headers) {
        if (this.opened == false) {
            throw new Error('Cannot call res.writeHead after end.');
        }
        this.head = {
            retcode: retcode, 
            headers: headers
        };
    }
    MockResponse.prototype.write = function(str) {
        if (this.opened == false) {
            throw new Error('Cannot call res.write after end.');
        }
        this.stdout += str;
    }
    MockResponse.prototype.end = function(str) {
        if (this.opened == false) {
            throw new Error('Cannot call res.end after end.');
        }
        this.stdout += str;
        this.opened = false;
    }
    return MockResponse;
})();

var options1 = {
    packagePath: path.join(codecampPath, 'react'), 
    language: 'js', 
    folder: 'src'
};
eslint(function(err, result) {
    if (err) {
        console.log('err', err);
        throw new Error(err.message);
    }
    console.log('eslint.result', result);
    eslintToEventStream(function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('eslintToEventStream.result', result);
    });
});
function eslint(callback) {
    manager.eslintExec(options1, callback);
}
function eslintToEventStream(callback) {
    var res = new MockResponse();
    manager.eslintExecToEventStream(options1, res, function(err, result) {
        if (err) {
            console.log('err', err);
            throw new Error(err.message);
        }
        console.log('res.head', res.head);
        console.log('res.stdout', res.stdout);
        console.log('res.stderr', res.stderr);
        callback(null, result);
    });
}
