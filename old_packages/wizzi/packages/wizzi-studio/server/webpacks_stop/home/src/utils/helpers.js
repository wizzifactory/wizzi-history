/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi-studio-express\wizzi\ittf\server\webpacks\home\src\utils\helpers.js.ittf
    utc time: Mon, 20 Aug 2018 16:09:59 GMT
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
            word.split('');
        }).map((letters) => {
            const first = letters.shift();
            return [first.toUpperCase(), ...letters].join('');
        }).join(' ')
        
        
    ;
};
