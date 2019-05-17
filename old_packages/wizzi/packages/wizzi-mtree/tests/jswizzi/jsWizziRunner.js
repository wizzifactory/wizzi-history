/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-mtree\src\ittf\tests\jswizzi\jswizzirunner.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('wizzi-utils').file;
var verify = require('wizzi-utils').verify;

var JsWizziContext = require('../../lib/jswizzi/jsWizziContext');
var jsWizziRunner = require('../../lib/jswizzi/jsWizziRunner');

describe("jsWizziRunner", function() {
    var declares = [
        {
            code: 'var x = { a:1, b:\'alfa\', c:4 }; return x;', 
            expected_equal: {
                a: 1, 
                b: 'alfa', 
                c: 4
            }
        }, 
        {
            code: 'var x = [ 1, \'alfa\', 4 ]; return x;', 
            expected_equal: [
                1, 
                'alfa', 
                4
            ]
        }
    ];
    var mathExpressions = [
        {
            code: '2 + 10', 
            expected: 12
        }, 
        {
            code: '2 - 10', 
            expected: -8
        }, 
        {
            code: '2 * 10', 
            expected: 20
        }, 
        {
            code: '2 / 10', 
            expected: 0.2
        }, 
        {
            code: 'var x = 10; x += 2; return x;', 
            expected: 12
        }, 
        {
            code: 'var x = 10; x -= 2; return x;', 
            expected: 8
        }, 
        {
            code: 'var x = 10; x *= 2; return x;', 
            expected: 20
        }, 
        {
            code: 'var x = 10; x /= 2; return x;', 
            expected: 5
        }
    ];
    var stringExpressions = [
        {
            code: 'var x = \'alba\'; x = x.toUpperCase(); return x;', 
            expected: 'ALBA'
        }, 
        {
            code: 'var x = \'a,b,c,d\'; x = x.split(\',\'); return x;', 
            expected_equal: ['a', 'b', 'c', 'd']
        }, 
        {
            code: 'var x = \'a1,b1,c1,d1\'; x = x.indexOf(\'b1\'); return x;', 
            expected_number: 3
        }, 
        {
            code: 'var x = \'a1,b1,c1,d1\'; x = x.substr(-2,2); return x;', 
            expected: 'd1'
        }, 
        {
            code: 'var x = \'a1,b1,c1,d1\'; x = x.substring(0,5); return x;', 
            expected: 'a1,b1'
        }, 
        {
            code: 'String.fromCodePoint(65, 90)', 
            expected: 'AZ'
        }, 
        {
            code: 'String.fromCodePoint(65, 66, 67)', 
            expected: 'ABC'
        }
    ];
    var logicalExpressions = [
        {
            code: 'true && false', 
            expected_equal: false
        }, 
        {
            code: 'true || false', 
            expected_equal: true
        }, 
        {
            code: '!true', 
            expected_equal: false
        }, 
        {
            code: '\'aa\' == \'aa\'', 
            expected_equal: true
        }, 
        {
            code: '\'aa\' === \'aa\'', 
            expected_equal: true
        }, 
        {
            code: '3 > 2', 
            expected_equal: true
        }, 
        {
            code: '3 >= 3', 
            expected_equal: true
        }, 
        {
            code: '3 >= 3 && 4 < 5', 
            expected_equal: true
        }, 
        {
            code: '3 >= 3 && 4 <= 4', 
            expected_equal: true
        }
    ];
    var unaryExpressions = [
        {
            code: 'var x = 2; x = -x; return x', 
            expected_number: -2
        }, 
        {
            code: 'var x = 2; x = +x; return x', 
            expected_number: 2
        }, 
        {
            code: 'var x = 2; x++; return x', 
            expected_number: 3
        }, 
        {
            code: 'var x = 2, y = 2; y = x++; return y', 
            expected_number: 2
        }, 
        {
            code: 'var x = 2, y = 2; y = ++x; return y', 
            expected_number: 3
        }, 
        {
            code: 'var x = 2, y = 2; y = --x; return { x:x, y:y }', 
            expected_equal: {
                x: 1, 
                y: 1
            }
        }, 
        {
            code: 'var x = 2, y = 2; y = x--; return { x:x, y:y }', 
            expected_equal: {
                x: 1, 
                y: 2
            }
        }
    ];
    var memberAccesses = [
        {
            code: 'var x = { a: [ { b:[9] } ] }; return x.a[0].b[0];', 
            expected_number: 9
        }, 
        {
            code: 'var x = { a: [ { b:[\'abcd\'] } ] }; return x.a[0].b;', 
            expected_equal: [
                'abcd'
            ]
        }, 
        {
            code: 'var x = { a: [ { b:[\'abcd\'] } ] }; return x.a[0].b[0];', 
            expected_equal: 'abcd'
        }, 
        {
            code: 'var x = { a: [ { b:[\'abcd\'] } ] }; return x.a[0].b[0].toUpperCase();', 
            expected_equal: 'ABCD'
        }, 
        {
            code: 'var x = { a: [ { b:[\'abcd\'] } ] }; return x.a[0].b[0].toUpperCase()[1];', 
            expected_equal: 'B'
        }
    ];
    var conditionals = [
        {
            code: '10 > 9 ? 1 : 0', 
            expected_number: 1
        }, 
        {
            code: 'var x = 10, y = 0; if ( x > 5 ) { y += 2; } return y;', 
            expected_number: 2
        }, 
        {
            code: 'var x = 10, y = 0; if ( x > 15 ) { y += 2; } else { y -= 2; } return y;', 
            expected_number: -2
        }
    ];
    var iterations = [
        {
            code: 'var x = 10, y = 0; for( var i=0; i<x; i++) { y += 2; } return y;', 
            expected_number: 20
        }, 
        {
            code: 'var x = 10, y = 0; for( var i=0; i<x; i++) { if (i > 4) { continue; } y += 2; } return y;', 
            expected_number: 10
        }, 
        {
            code: 'var x = 10, y = 0; while( x > 0 ) { y += 2; x--; } return y;', 
            expected_number: 20
        }, 
        {
            code: 'var x = 10, y = 0; while( x > 0 ) { y += 2; x--; if (x < 6) { break; } } return y;', 
            expected_number: 10
        }, 
        {
            code: 'var x = 10, y = 0; do { y += 2; x--; } while( x > 0 ) return y;', 
            expected_number: 20
        }
    ];
    var builtinFunctions = [
        {
            code: 'var x = typeof(nemo); return x;', 
            expected: 'undefined'
        }
    ];
    it("should run declares", function() {
        runGroup(declares);
    });
    it("should run string expressions", function() {
        runGroup(stringExpressions);
    });
    it("should run math expressions", function() {
        var i, i_items=mathExpressions, i_len=mathExpressions.length, expr;
        for (i=0; i<i_len; i++) {
            expr = mathExpressions[i];
            expect(runExpression(expr.code)).to.be.a('number');
            expect(runExpression(expr.code)).to.be(expr.expected);
        }
    });
    it("should run logical expressions", function() {
        runGroup(logicalExpressions);
    });
    it("should run unary expressions", function() {
        runGroup(unaryExpressions);
    });
    it("should run member accesses", function() {
        runGroup(memberAccesses);
    });
    it("should run conditional statements", function() {
        runGroup(conditionals);
    });
    it("should run iteration statements", function() {
        runGroup(iterations);
    });
    it("should run builtinFunctions expressions", function() {
        runGroup(builtinFunctions);
    });
    function runGroup(items) {
        var i, i_items=items, i_len=items.length, expr;
        for (i=0; i<i_len; i++) {
            expr = items[i];
            if (typeof(expr.expected_equal) !== 'undefined') {
                // loose equality works for objects
                expect(runExpression(expr.code)).to.eql(expr.expected_equal);
            }
            else if (typeof(expr.expected_number) !== 'undefined') {
                expect(runExpression(expr.code)).to.be.a('number');
                expect(runExpression(expr.code)).to.be(expr.expected_number);
            }
            else {
                // log 'expr.code, expr.expected', expr.code, expr.expected
                expect(runExpression(expr.code)).to.be.a('string');
                expect(runExpression(expr.code)).to.be(expr.expected);
            }
        }
    }
    function runExpression(code) {
        // without ctor arguments means: isForInterpolation
        var jsWizziContext = new JsWizziContext();
        // run the expression embedded in a var declaration 'result'
        var hr = jsWizziRunner.run(code.indexOf('return ') > -1 ? 'var result = function dummy() { ' + code + ' }();' : 'var result = ' + code + ';', jsWizziContext, {
            verbose: false
        });
        if (hr && hr.__is_error) {
            throw new Error(hr);
        }
        // return the 'result' var from the context
        return jsWizziContext.getValue('result');
    }
});
