/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\utils\withpageinfo.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
export const PageInfoContext = React.createContext({
    title: 'Wizzi', 
    setTitle: () => {
    }
});
;
export function withPageInfo(Component) {
    return function PageInfoComponent(props) {
            return  (
                    <PageInfoContext.Consumer>
                    {
                        (pageInfo) => {
                            return  (
                                    <Component {...props} pageInfo={pageInfo}>
                                    </Component>
                                )
                            ;
                        }
                    }</PageInfoContext.Consumer>
                )
            ;
        };
};
