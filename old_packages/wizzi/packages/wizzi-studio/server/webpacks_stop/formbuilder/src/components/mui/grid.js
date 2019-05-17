/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\components\mui\grid.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';

import React, { Component, PropTypes } from 'react';
class Row extends Component {
    constructor() {
        super();
    }
    
    render() {
        const { children } = this.props;
        return  (
                <div style={this.getStyle()}>
                    <div style={{
                        display: "table", 
                        content: " "
                    }}>
                    </div>
                
                {children}
                    <div style={{
                        clear: "both"
                    }}>
                    </div>
                
                </div>
            )
        ;
    }
    getStyle(span) {
        return {
                marginLeft: 5, 
                marginRight: 5
            };
    }
}
Row.propTypes = {};
export default Row;
class Col extends Component {
    constructor() {
        super();
    }
    
    render() {
        const { span, children } = this.props;
        return  (
                <div style={this.getStyle(span)}>
                {children}
                </div>
            )
        ;
    }
    getStyle(span) {
        return {
                boxSizing: "border-box", 
                position: "relative", 
                width: (span / 12 * 100) + '%', 
                float: "left", 
                paddingLeft: 10, 
                paddingRight: 10, 
                minHeight: 1
            };
    }
}
Col.propTypes = {
    span: PropTypes.number.isRequired
};

module.exports = {
    Row: Row,
    Col: Col
};
