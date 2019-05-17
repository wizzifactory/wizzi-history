/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\csslayout\ittf\webpacks\csslayout\src\components\mui\heading.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:51 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
const styleSheet = createStyleSheet('Heading', theme => (
    {}));

class Heading extends React.Component  {
    render() {
        const {
            data
        } = this.props;
        const { format, text, span, style: styleProp } = data;
        if (format === 'h1.span') {
            return  (
                    <h1 style={ styleProp.h1 }>
                    { text }
                        <span style={ styleProp.span }>
                        { span }
                        </span>
                    
                    </h1>
                )
            ;
        }
        else if (format === 'h1') {
            return  (
                    <h1 style={ styleProp.h1 }>
                    { text }
                    </h1>
                )
            ;
        }
        else {
            return  (
                    <div>
                    { 'Unknown Heading format ' + format }
                    </div>
                )
            ;
        }
    }
}

const HeadingStyled = withStyles(styleSheet)(Heading)

;
export default HeadingStyled;
