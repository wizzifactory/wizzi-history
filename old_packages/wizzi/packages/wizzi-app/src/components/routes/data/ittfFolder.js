/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\data\ittffolder.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
var sample1 = {
    name: 'sample1', 
    children: [
        {
            name: 'doc1', 
            content: [
                "module", 
                "    kind es6", 
                "    var i = 0"
            ].join('\n')
        }, 
        {
            name: 'doc2', 
            content: [
                "module", 
                "    kind es6", 
                "    import Brick from './bricks'", 
                "    _ Brick.go"
            ].join('\n')
        }, 
        {
            name: 'folder1', 
            children: [
                {
                    name: 'doc1-1', 
                    content: [
                        "module", 
                        "    kind es6", 
                        "    const a = 1"
                    ].join('\n')
                }
            ]
        }
    ]
};
function setPaths(item, parent) {
    item.path = parent ? parent.path + '/' + item.name : item.name;
    if (item.children) {
        var i, i_items=item.children, i_len=item.children.length, child;
        for (i=0; i<i_len; i++) {
            child = item.children[i];
            setPaths(child, item);
        }
    }
}
function find(item, pathName) {
    if (item.path === pathName) {
        return item;
    }
    if (item.children) {
        var test;
        var i, i_items=item.children, i_len=item.children.length, child;
        for (i=0; i<i_len; i++) {
            child = item.children[i];
            test = find(child, pathName);
            if (test) {
                return test;
            }
        }
    }
    return null;
}
class IttfFolder {
    constructor(data) {
        this.data = data;
        setPaths(this.data);
    }
    getData() {
        return this.data;
    }
    find(pathName) {
        return find(this.data, pathName);
    }
    getContent(pathName) {
        var item = this.find(pathName);
        return item ? item.content : '';
    }
    putContent(pathName, content) {
        var item = this.find(pathName);
        if (item) {
            item.content = content;
        }
    }
}
var sample1Folder = new IttfFolder(sample1);
export default sample1Folder;
