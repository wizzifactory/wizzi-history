/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-scripts\src\ittf\examples\console\index.js.ittf
*/
'use strict';
// generated by wizzi.codegen.js4.es2015.module
function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var path = require('path');
var util = require('util');
var packageIndex = require('../../index');
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

var run = 5;
if (run == 1) {
    scriptsConsole.openWindowConsole({
        cwd: 'c:\\my\\wizzi\\v5\\github\\wizzi-utils'
    });
}
if (run == 2) {
    scriptsConsole.openWindowPowershell({
        cwd: 'C:\\My\\wizzi\\v5\\github\\wizzi-utils', 
        document: 'github.ps1'
    });
}
if (run == 3) {
    scriptsConsole.openDocument("C:\\My\\wizzi\\v5\\scripts\\psipse\\v5-wizzi-utils.generate.ps1");
}
if (run == 4) {
    scriptsConsole.openNotePad("C:\\My\\wizzi\\v5\\scripts\\psipse\\v5-wizzi-utils.generate.ps1");
}
if (run == 5) {
    scriptsConsole.openVsCode("C:\\My\\wizzi\\v5\\scripts\\psipse\\v5-wizzi-utils.generate.ps1");
}