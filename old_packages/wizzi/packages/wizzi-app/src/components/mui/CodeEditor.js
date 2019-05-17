/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\mui\codeeditor.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MonacoEditor from 'react-monaco-editor';
import CodeHighLight from './CodeHighLight';
const styles = theme => (
    {});

class CodeEditor extends React.Component {
    handleChange = (newValue, e) => {
        const {
            onChange
        } = this.props;
        console.log('newValue', newValue);
        if (onChange) {
            onChange(newValue);
        }
    }
    render() {
        const {
            value,
            theme,
            language,
            width,
            height,
            browse
        } = this.props;
        if (browse) {
            const chLanguage = language === 'javascript' ? 'js' : language;
            return  (
                    <div style={{
                        width: width + 'px', 
                        height: height + 'px'
                    }}>
                        <CodeHighLight codeSnippet={value} language={chLanguage}>
                        </CodeHighLight>
                    
                    </div>
                )
            ;
        }
        else {
            return  (
                    <MonacoEditor value={value} width={width} height={height} theme={theme} language={language} options={{
                        selectOnLineNumbers: true
                    }} onChange={this.handleChange}>
                    </MonacoEditor>
                )
            ;
        }
    }
}

CodeEditor.propTypes = {
    value: PropTypes.string.isRequired,
    theme: PropTypes.string,
    language: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    browse: PropTypes.bool,
    options: PropTypes.object,
    onChange: PropTypes.func
}

CodeEditor.defaultProps  = {
    theme: 'vs-dark',
    language: 'javascript',
    width: 800,
    height: 600,
    browse: false,
    options: {}
}
export default withStyles(styles)(CodeEditor)
;
