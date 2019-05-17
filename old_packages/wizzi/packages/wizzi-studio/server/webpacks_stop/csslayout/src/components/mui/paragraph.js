/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\csslayout\ittf\webpacks\csslayout\src\components\mui\paragraph.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:51 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
const styleSheet = createStyleSheet('Paragraph', theme => (
    {
        panel: {
            padding: '5px 20px', 
            margin: 0, 
            font: "400 16px/20px 'Open Sans', sans-serif", 
            color: "#333"
        }
    }));

class Paragraph extends React.Component  {
    render() {
        const {
            classes,
            data
        } = this.props;
        const { text, style: styleProp } = data;
        return  (
                <p className={classes.panel} style={ styleProp }>
                { text }
                </p>
            )
        ;
    }
}

const ParagraphStyled = withStyles(styleSheet)(Paragraph)

;
export default ParagraphStyled;
