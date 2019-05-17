/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\wf\ittf\webpacks\wf\src\components\documenteditor.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:42 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
// import Textarea from 'material-ui/Input/Textarea'
// import CodeEditor from './CodeEditor'
import AceCodeEditor from './AceCodeEditor';
const styleSheet = createStyleSheet('DocumentEditor', theme => (
    {}));

class DocumentEditor extends React.Component  {
    render() {
        const {
            value,
            onChange,
            onEditorRef
        } = this.props;
        return  (
                <div>
                {
                    {value}
                     &&  (
                        <AceCodeEditor value={value} onChange={onChange} onEditorRef={(node) => {
                            if (onEditorRef) {
                                onEditorRef(node);
                            }
                        }}>
                        </AceCodeEditor>
                    )
                    
                }</div>
            )
        ;
    }
}

DocumentEditor.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
}

const DocumentEditorStyled = withStyles(styleSheet)(DocumentEditor)

;
export default DocumentEditorStyled;
