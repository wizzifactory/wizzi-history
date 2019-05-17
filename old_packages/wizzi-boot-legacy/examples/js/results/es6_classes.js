/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\wizzi-npm\node_modules\wizzi\examples\js\ittf\es6_classes.js.ittf
    utc time: Mon, 13 Mar 2017 12:40:15 GMT
*/
'use strict';
class animal {
    constructor(kind,numlegs) {
        this.kind = kind;
        this.numlegs = numlegs;
    }
    
}

class cat extends animal {
    constructor(name) {
        super('cat',4);
        this.name = name;
    }
    
    toString() {
        console.log(this.name, this.kind, this.numlegs);
    }
}

var miao = new cat('miao');
miao.toString();
