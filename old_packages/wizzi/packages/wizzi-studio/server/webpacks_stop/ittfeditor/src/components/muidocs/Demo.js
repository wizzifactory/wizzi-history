/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\muidocs\demo.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
var verify = require('wizzi-utils-webpack').verify;
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Collapse from 'material-ui/transitions/Collapse';
import CodeIcon from 'material-ui-icons/Code';
import MarkdownElement from './MarkdownElement';
// const requireDemos = require.context('home/src', true, /\.js$/)
// const requireDemoSource = require.context('!raw-loader!home/src', true, /\.js$/)
const styleSheet = createStyleSheet('Demo', theme => (
    {
        root: {
            fontFamily: theme.typography.fontFamily, 
            position: 'relative', 
            backgroundColor: theme.palette.background.contentFrame, 
            marginBottom: 40, 
            marginLeft: -16, 
            marginRight: -16
        }, 
        demo: theme.mixins.gutters({
            display: 'flex', 
            justifyContent: 'center', 
            paddingTop: 20, 
            paddingBottom: 20
        }), 
        codeButton: {
            display: 'none', 
            zIndex: 10, 
            position: 'absolute', 
            top: 2, 
            right: 7
        }, 
        code: {
            display: 'none', 
            padding: 0, 
            margin: 0, 
            '& pre': {
                overflow: 'auto', 
                margin: '0px !important', 
                borderRadius: '0px !important'
            }
        }, 
        [theme.breakpoints.up(600)]: {
            codeButton: {
                display: 'block'
            }, 
            code: {
                display: 'block'
            }, 
            root: {
                marginLeft: 0, 
                marginRight: 0
            }
        }
    }));

class Demo extends React.Component  {
    state = {
        codeOpen: false
    };
    handleCodeButtonClick = () => {
        this.setState({
            codeOpen: !this.state.codeOpen
        });
    }
    render() {
        const {
            classes,
            demo
        } = this.props;
        // const DemoComponent = requireDemos(`./${demo}`).default
        // const demoSource = requireDemoSource(`./${demo}`)
        // const code = `\`\`\`js\n${demoSource}\n\`\`\``
        return  (
                <h1>
                Demo {demo} not implemented
                </h1>
            )
        ;
    }
}

Demo.propTypes = {
    classes: PropTypes.object.isRequired,
    demo: PropTypes.string.isRequired
}

const DemoStyled = withStyles(styleSheet)(Demo)
;
export default DemoStyled;
/**
  params
    string code
      # the error name or number
    string method
    string message
      # optional
    { innerError
      # optional
*/
function error(code, method, message, innerError) {
    var parameter = null;
    if (verify.isObject(message)) {
        parameter = message.parameter;
        message = message.message;
    }
    return verify.error(innerError, {
        name: ( verify.isNumber(code) ? 'Err-' + code : code ),
        method: '.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
