/*
    artifact generator: C:\My\wizzi\v6\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v6\plugins\wizzi-js\src\ittf\examples\codegen\index.js.ittf
*/
'use strict';
var chalk = require('chalk');
var genContext = require('wizzi').genContext;
var statement = require('../../lib/artifacts/js/module/gen/codegen/statement');
var jsNode = require('./jsmodel/jsnode');
var examples = [];
function example(test, expected, options) {
    examples.push({
        test: test, 
        expected: expected, 
        options: options || {}
    });
}
function getCtx() {
    return new genContext({
            options: {
                CRLF: '\n', 
                indentSpaces: 4
            }, 
            pman: {
                globalContext: function() {
                    return {};
                }, 
                wizziFactory: {
                    
                }
            }
        });
}
example({
    nodes: [
        {
            n: "var", 
            v: "tau", 
            children: [
                
            ]
        }
    ]
}, 'var = tau;');
example({
    nodes: [
        {
            n: "var", 
            v: "beta = 'astra'", 
            children: [
                
            ]
        }
    ]
}, "var = beta = 'astra';");
example({
    nodes: [
        {
            n: "var", 
            v: "alfa", 
            children: [
                {
                    n: "_", 
                    v: "getAlpha", 
                    children: [
                        
                    ]
                }
            ]
        }
    ]
}, "var alpha = getAlpha();");
example({
    nodes: [
        {
            n: "var", 
            v: "", 
            children: [
                {
                    n: "decl", 
                    v: "i", 
                    children: [
                        
                    ]
                }, 
                {
                    n: "decl", 
                    v: "k = 10", 
                    children: [
                        
                    ]
                }, 
                {
                    n: "decl", 
                    v: "name", 
                    children: [
                        
                    ]
                }
            ]
        }
    ]
}, "var i, k = 10, name;");
example({
    nodes: [
        {
            n: "let", 
            v: "sigma = 1", 
            children: [
                
            ]
        }
    ]
}, 'let sigma = 1;');
example({
    nodes: [
        {
            n: "let", 
            v: "omega = 1", 
            children: [
                
            ]
        }
    ]
}, 'let omega = 1;');
example({
    nodes: [
        {
            n: "const", 
            v: "ossian", 
            children: [
                {
                    n: "_", 
                    v: "buuh", 
                    children: [
                        {
                            n: "@", 
                            v: "wash", 
                            children: [
                                
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}, "const ossian = buuh('wash')");
example({
    nodes: [
        {
            n: "react", 
            v: "Horse", 
            children: [
                {
                    n: "prop", 
                    v: "title", 
                    children: [
                        {
                            n: "string", 
                            v: "", 
                            children: [
                                
                            ]
                        }, 
                        {
                            n: "default", 
                            v: "stefi", 
                            children: [
                                
                            ]
                        }
                    ]
                }, 
                {
                    n: "prop", 
                    v: "onClick", 
                    children: [
                        {
                            n: "func", 
                            v: "", 
                            children: [
                                
                            ]
                        }
                    ]
                }, 
                {
                    n: "style", 
                    v: "", 
                    children: [
                        {
                            n: "@", 
                            v: "dark", 
                            children: [
                                {
                                    n: "{", 
                                    v: "", 
                                    children: [
                                        {
                                            n: "@", 
                                            v: "color 'blue'", 
                                            children: [
                                                
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }, 
                        {
                            n: "@", 
                            v: "appBarHome", 
                            children: [
                                {
                                    n: "{", 
                                    v: "", 
                                    children: [
                                        {
                                            n: "@", 
                                            v: "backgroundColor 'transparent'", 
                                            children: [
                                                
                                            ]
                                        }, 
                                        {
                                            n: "@", 
                                            v: "boxShadow 'none'", 
                                            children: [
                                                
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }, 
                {
                    n: "state", 
                    v: "", 
                    children: [
                        {
                            n: "@", 
                            v: "age 10", 
                            children: [
                                
                            ]
                        }
                    ]
                }, 
                {
                    n: "did-mount", 
                    v: "", 
                    children: [
                        {
                            n: "_", 
                            v: "hello", 
                            children: [
                                
                            ]
                        }
                    ]
                }, 
                {
                    n: "will-unmount", 
                    v: "", 
                    children: [
                        {
                            n: "_", 
                            v: "hello", 
                            children: [
                                
                            ]
                        }
                    ]
                }, 
                {
                    n: "render", 
                    v: "", 
                    children: [
                        {
                            n: ".", 
                            v: "hello", 
                            children: [
                                {
                                    n: "<", 
                                    v: "Link", 
                                    children: [
                                        {
                                            n: "@", 
                                            v: "href 'miss'", 
                                            children: [
                                                
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}, '', {
    __jskind: 'react'
});
var len_1 = examples.length;
function repeater_1(index_1) {
    if (index_1 === len_1) {
        return next_1();
    }
    var item_1 = examples[index_1];
    // log 'item_1.test', item_1.test
    var mTree = item_1.test;
    var js = new jsNode(mTree.n, mTree.v);
    js.loadFromMTree(mTree);
    var ctx = getCtx();
    ctx.__jskind = item_1.options.__jskind;
    statement.gen(js, ctx, function(err, notUsed) {
        if (err) {
            return callback(err);
        }
        if (ctx.getContent() == item_1.expected) {
            console.log(chalk.green('test' + '\n' + ctx.getContent()))
            console.log(chalk.green('expected' + '\n' + item_1.expected))
        }
        else {
            console.log(chalk.red('test' + '\n' + ctx.getContent()))
            console.log(chalk.red('expected' + '\n' + item_1.expected))
        }
        console.log('----------------------------------------------------');
        process.nextTick(function() {
            repeater_1(index_1 + 1);
        });
    });
}
repeater_1(0);
function next_1() {
}
