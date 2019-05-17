/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\My\wizzi\wizzi-npm\node_modules\wizzi\examples\js\ittf\iife.js.ittf
    utc time: Mon, 13 Mar 2017 12:40:15 GMT
*/
'use strict';
+(function($) {
    function high(element) {
        $(element).addClass('highlight');
    }
})(jQuery);
(function($) {
    function high(element) {
        $(element).addClass('highlight');
    }
})(jQuery);
var spec = (function() {
    function getGreet() {
        return 'hello';
    }
    return {
            sayHello: function(name) {
                console.log(getGreet() + ' ' + name);
            }
        };
})();
spec.sayHello('stefi');
console.log('spec.getGreet: ', spec.getGreet);
