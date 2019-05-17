/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\documenteditor.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
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
            onEditorRef
        } = this.props;
        return  (
                <div>
                {
                    {value}
                     &&  (
                        <AceCodeEditor value={value} onEditorRef={(node) => {
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

const DocumentEditorStyled = withStyles(styleSheet)(DocumentEditor)
;
export default DocumentEditorStyled;
