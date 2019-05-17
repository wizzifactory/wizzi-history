/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: C:\my\wizzi\v1\kernel\wizzi-boot\examples\js\ittf\iife.js.ittf
    utc time: Tue, 11 Jul 2017 11:56:16 GMT
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
