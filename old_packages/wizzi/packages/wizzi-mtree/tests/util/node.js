/*
    artifact generator: C:\My\wizzi\v5\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\kernel\wizzi-mtree\src\ittf\tests\util\node.js.ittf
*/
'use strict';

var path = require('path');
var util = require('util');

var del = require('del');
var expect = require('expect.js');

var _ = require('lodash');
var file = require('wizzi-utils').file;
var verify = require('wizzi-utils').verify;

var ittfTree = require('wizzi-utils').IttfMTreeEx;
var node = require('../../lib/util/node');

describe("util.node", function() {
    var nodeUpdates = [
        {
            action: 'remove', 
            name: 'n11', 
            original: {
                name: 'root', 
                children: [
                    {
                        name: 'n1', 
                        value: 'v1', 
                        children: [
                            {
                                name: 'n11', 
                                value: 'v11', 
                                children: [
                                    {
                                        name: 'n111'
                                    }
                                ]
                            }, 
                            {
                                name: 'n12', 
                                value: 'v12'
                            }
                        ]
                    }
                ]
            }, 
            expected: {
                name: 'root', 
                children: [
                    {
                        name: 'n1', 
                        value: 'v1', 
                        children: [
                            {
                                name: 'n12', 
                                value: 'v12'
                            }
                        ]
                    }
                ]
            }
        }, 
        {
            action: 'replace', 
            name: 'n11', 
            original: {
                name: 'root', 
                children: [
                    {
                        name: 'n1', 
                        value: 'v1', 
                        children: [
                            {
                                name: 'n11', 
                                value: 'v11', 
                                children: [
                                    {
                                        name: 'n111'
                                    }
                                ]
                            }, 
                            {
                                name: 'n12', 
                                value: 'n12', 
                                children: [
                                    {
                                        name: 'n121'
                                    }
                                ]
                            }
                        ]
                    }, 
                    {
                        name: 'n2', 
                        value: 'v2', 
                        children: [
                            {
                                name: 'n21'
                            }
                        ]
                    }
                ]
            }, 
            replacer: {
                name: 'n101', 
                children: [
                    {
                        name: 'n1011', 
                        value: 'v1011'
                    }
                ]
            }, 
            expected: {
                name: 'root', 
                children: [
                    {
                        name: 'n1', 
                        value: 'v1', 
                        children: [
                            {
                                name: 'n101', 
                                children: [
                                    {
                                        name: 'n1011', 
                                        value: 'v1011'
                                    }
                                ]
                            }, 
                            {
                                name: 'n12', 
                                value: 'n12', 
                                children: [
                                    {
                                        name: 'n121'
                                    }
                                ]
                            }
                        ]
                    }, 
                    {
                        name: 'n2', 
                        value: 'v2', 
                        children: [
                            {
                                name: 'n21'
                            }
                        ]
                    }
                ]
            }
        }
    ];
    var nodeFinds = [
        {
            action: 'findCommand', 
            name: 'hook', 
            value: 'default', 
            expected: 5, 
            original: {
                name: 'root', 
                id: 1, 
                children: [
                    {
                        name: 'n1', 
                        value: 'v1', 
                        id: 2, 
                        children: [
                            {
                                name: 'n11', 
                                value: 'v11', 
                                id: 3, 
                                children: [
                                    {
                                        name: 'n111', 
                                        id: 4
                                    }
                                ]
                            }, 
                            {
                                name: '$hook', 
                                value: 'default', 
                                id: 5
                            }
                        ]
                    }
                ]
            }
        }, 
        {
            action: 'findHook', 
            startitem: 5, 
            expected: 2, 
            original: {
                name: 'root', 
                id: 1, 
                children: [
                    {
                        name: '$hook', 
                        value: 'main', 
                        id: 2, 
                        children: [
                            {
                                name: 'n11', 
                                value: 'v11', 
                                id: 3, 
                                children: [
                                    {
                                        name: 'n111', 
                                        id: 4
                                    }
                                ]
                            }, 
                            {
                                name: '$append', 
                                value: 'main', 
                                id: 5
                            }
                        ]
                    }, 
                    {
                        name: 'n2', 
                        value: 'v2', 
                        id: 6, 
                        children: [
                            
                        ]
                    }, 
                    {
                        name: 'n3', 
                        value: 'v3', 
                        id: 7, 
                        children: [
                            
                        ]
                    }
                ]
            }
        }
    ];
    it("should modify nodes", function() {
        var i, i_items=nodeUpdates, i_len=nodeUpdates.length, item;
        for (i=0; i<i_len; i++) {
            item = nodeUpdates[i];
            if (item.action === 'remove') {
                var original = ittfTree.createFrom(item.original);
                console.log('original', original.toString());
                var expected = ittfTree.createFrom(item.expected);
                var toremove = original.find(item.name);
                node.remove(toremove);
                console.log('toremove', toremove.toString());
                console.log('original after', original.toString());
                console.log('expected', expected.toString());
                expect(original.equals(expected)).to.be(true);
            }
            if (item.action === 'replace') {
                var original = ittfTree.createFrom(item.original);
                console.log('original', original.toString());
                var replacer = ittfTree.createFrom(item.replacer);
                var expected = ittfTree.createFrom(item.expected);
                var toreplace = original.find(item.name);
                console.log('toreplace', toreplace.toString());
                node.replace(toreplace, [replacer]);
                console.log('replacer', replacer.toString());
                console.log('original after', original.toString());
                console.log('expected', expected.toString());
                expect(original.equals(expected)).to.be(true);
            }
        }
    });
    it("should find node commands", function() {
        var i, i_items=nodeFinds, i_len=nodeFinds.length, item;
        for (i=0; i<i_len; i++) {
            item = nodeFinds[i];
            if (item.action === 'findCommand') {
                var original = ittfTree.createFrom(item.original);
                console.log('original', original.toString());
                var found = node.findIttfCommand(original, item.value, item.name);
                console.log('findCommand.found', found);
                expect(found).to.be.an('object');
                // loose equality works for objects
                expect(item.expected).to.eql(found.id);
            }
            if (item.action === 'findHook') {
                var original = ittfTree.createFrom(item.original);
                console.log('original', original.toString());
                var startitem = original.find({
                    id: item.startitem
                });
                console.log('startitem', item.startitem, startitem, startitem.value);
                var found = node.findHookExt(startitem, startitem.value, startitem);
                console.log('findHook.found', found);
                expect(found).to.be.an('object');
                // loose equality works for objects
                expect(item.expected).to.eql(found.id);
            }
        }
    });
});
