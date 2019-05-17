/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\acecodeeditor.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
var verify = require('wizzi-utils-webpack').verify;
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import AceEditor from 'react-ace';
import 'brace'
import 'brace/mode/jade'
import 'brace/theme/monokai'
import 'brace/ext/language_tools'
const styleSheet = createStyleSheet('AceCodeEditor', theme => (
    {}));

class AceCodeEditor extends React.Component  {
    componentWillReceiveProps(nextProps) {
        console.log('**** AceEditor.will-receive-props.value', nextProps.value);
        this.value = this.origValue = nextProps.value;
    }
    componentDidMount() {
        /** -àà
            const undo_manager = this.refs.ace.editor.getSession().getUndoManager();
            console.log('undo_manager', undo_manager);
            this.editor = this.refs.ace.editorundo_manager.reset();this.refs.ace.editor.getSession().setUndoManager(undo_manager);*/
    }
    handleRef = (node) => {
        if (node) {
            console.log('AceCodeEditor.handleRef.node', node);
            const undo_manager = node.editor.getSession().getUndoManager();
            console.log('undo_manager', undo_manager);
            this.editor = node.editor;
            undo_manager.reset();
            node.editor.getSession().setUndoManager(undo_manager);
            const { onEditorRef } = this.props;
            if (onEditorRef) {
                onEditorRef(this);
            }
        }
    }
    handleChange = () => {
        const { onChange } = this.props;
        this.value = this.editor.getValue();
        console.log('AceEditor.onChange', this.value);
        if (onChange) {
            onChange(this.value);
        }
    }
    render() {
        const {
            name,
            value,
            mode,
            onChange
        } = this.props;
        const defaultOptions = {
            enableBasicAutocompletion: false, 
            enableLiveAutocompletion: false, 
            tabSize: 2, 
            fontSize: 12, 
            showGutter: true
        };
        return  (
                <AceEditor ref={this.handleRef} mode={mode} theme="monokai" name={name} height="500px" width="100%" setOptions={ defaultOptions } value={value} onChange={this.handleChange} editorProps={{
                    $blockScrolling: Infinity
                }}>
                </AceEditor>
            )
        ;
    }
}

AceCodeEditor.propTypes = {
    mode: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
}

AceCodeEditor.defaultProps  = {
    mode: 'jade',
    name: 'IttfDocumentEditor',
    value: ''
}

const AceCodeEditorStyled = withStyles(styleSheet)(AceCodeEditor)
;
export default AceCodeEditorStyled;
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
