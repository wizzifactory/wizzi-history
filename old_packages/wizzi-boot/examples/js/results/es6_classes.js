/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\my\wizzi\v1\kernel\wizzi-boot\examples\js\ittf\es6_classes.js.ittf
    utc time: Tue, 11 Jul 2017 11:56:16 GMT
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
