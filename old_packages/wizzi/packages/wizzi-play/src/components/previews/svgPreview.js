/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\components\previews\svgpreview.js.ittf
    utc time: Thu, 31 Jan 2019 10:21:44 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
var styles = {
    backgroundColor: '#fff', 
    margin: '20px', 
    padding: '20px'
};
class SvgPreview extends React.Component {
    render() {
        const {
            content
        } = this.props;
        function createMarkup() {
            return {
                    __html: content
                };
        }
        return  (
                <div style={styles}>
                    <div dangerouslySetInnerHTML={ createMarkup() }>
                    </div>
                
                </div>
            )
        ;
    }
}
export default withStyles(styles)(SvgPreview)
