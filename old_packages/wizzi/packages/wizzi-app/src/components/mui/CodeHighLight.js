/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\mui\codehighlight.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Lowlight from 'react-lowlight';
// Load any languages you want to use
// (see https://github.com/isagalaev/highlight.js/tree/master/src/languages)
import js from 'highlight.js/lib/languages/javascript';
// Load any theme you want to use
import 'highlight.js/styles/monokai.css';
// Then register them with lowlight
Lowlight.registerLanguage('js', js);
const styles = theme => (
    {
        codeView: {
            height: '100%', 
            width: '100%', 
            overflow: 'auto'
        }
    });

class CodeHighLight extends React.Component {
    render() {
        const {
            classes,
            codeSnippet,
            language
        } = this.props;
        return  (
                <div className={classes.codeView}>
                    <Lowlight language={ language || 'js' } value={ codeSnippet }>
                    </Lowlight>
                
                </div>
            )
        ;
    }
}
export default withStyles(styles)(CodeHighLight)
;
