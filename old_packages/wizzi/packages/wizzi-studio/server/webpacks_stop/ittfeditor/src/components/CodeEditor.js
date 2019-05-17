/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\codeeditor.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
var verify = require('wizzi-utils-webpack').verify;
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isequal';
const styleSheet = createStyleSheet('CodeEditor', theme => (
    {}));

class CodeEditor extends React.Component  {
    state = {
        isFocused: false
    };
    getCodeMirrorInstance() {
        return this.props.codeMirrorInstance || CodeMirror;
    }
    componentWillMount() {
        this.componentWillReceiveProps = debounce(this.componentWillReceiveProps, 0);
    }
    componentDidMount() {
        const codeMirrorInstance = this.getCodeMirrorInstance();
        this.codeMirror = codeMirrorInstance.fromTextArea(this.textareaNode, this.props.options);
        this.codeMirror.on('change', this.codemirrorValueChanged);
        this.codeMirror.on('focus', this.focusChanged.bind(this, true));
        this.codeMirror.on('blur', this.focusChanged.bind(this, false));
        this.codeMirror.setValue(this.props.defaultValue || this.props.value || '');
    }
    componentWillUnmount() {
        if (this.codeMirror) {
            this.codeMirror.toTextArea();
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.codeMirror && nextProps.value !== undefined && nextProps.value !== this.props.value && normalizeLineEndings(this.codeMirror.getValue()) !== normalizeLineEndings(nextProps.value)) {
            if (this.props.preserveScrollPosition) {
                const prevScrollPosition = this.codeMirror.getScrollInfo();
                this.codeMirror.setValue(nextProps.value);
                this.codeMirror.scrollTo(prevScrollPosition.left, prevScrollPosition.top);
            }
            else {
                this.codeMirror.setValue(nextProps.value);
            }
        }
        if (typeof nextProps.options === 'object') {
            for (let optionName in nextProps.options) {
                if (nextProps.options.hasOwnProperty(optionName)) {
                    this.setOptionIfChanged(optionName, nextProps.options[optionName]);
                }
            }
        }
    }
    setOptionIfChanged(optionName, newValue) {
        const oldValue = this.codeMirror.getOption(optionName);
        if (!isEqual(oldValue, newValue)) {
            this.codeMirror.setOption(optionName, newValue);
        }
    }
    getCodeMirror() {
        return this.codeMirror;
    }
    focus() {
        if (this.codeMirror) {
            this.codeMirror.focus();
        }
    }
    focusChanged(focused) {
        this.setState({
            isFocused: focused
        });
        this.props.onFocusChange && this.props.onFocusChange(focused);
    }
    codemirrorValueChanged = (doc, change) => {
        if (this.props.onChange && change.origin !== 'setValue') {
            this.props.onChange(doc.getValue(), change);
        }
    }
    render() {
        const editorClassName = classNames('ReactCodeMirror', this.state.isFocused ? 'ReactCodeMirror--focused' : null, this.props.className);
        return  (
                <div className={editorClassName}>
                    <textarea ref={(ref) => {
                        this.textareaNode = ref;
                    }} name={this.props.name} defaultValue={this.props.value} autoComplete="off" autoFocus={this.props.autoFocus}>
                    </textarea>
                
                </div>
            )
        ;
    }
}

CodeEditor.propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.any,
    codeMirrorInstance: PropTypes.func,
    defaultValue: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onFocusChange: PropTypes.func,
    options: PropTypes.object,
    value: PropTypes.string,
    preserveScrollPosition: PropTypes.bool
}

CodeEditor.defaultProps  = {
    preserveScrollPosition: false
}

const CodeEditorStyled = withStyles(styleSheet)(CodeEditor)
;
export default CodeEditorStyled;
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
