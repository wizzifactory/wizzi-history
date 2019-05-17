/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\csslayout\ittf\webpacks\csslayout\src\utils\helpers.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:51 GMT
*/
'use strict';
export function kebabCase(string) {
    return string.split(/ |_|-/).join('-').split('').map((a, i) => {
            if (a.toUpperCase() === a && a !== '-') {
                return (i !== 0 ? '-' : '') + a.toLowerCase();
            }
            return a;
        }).join('').toLowerCase()
        
        
        
        
    ;
};
export function titleize(string) {
    return string.split('-').map((word) => {
            word.split('')
        }).map((letters) => {
            const first = letters.shift();
            return [first.toUpperCase(), ...letters].join('');
        }).join(' ')
        
        
        
    ;
};
