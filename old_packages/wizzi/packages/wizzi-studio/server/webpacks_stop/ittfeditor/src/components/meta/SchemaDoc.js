/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\meta\schemadoc.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import ElementList from './schemadoc/ElementList';
import Element from './schemadoc/Element';
const styleSheet = createStyleSheet('SchemaDoc', theme => (
    {}));

class SchemaDoc extends React.Component  {
    state = {
        selectedElement: null
    };
    handleElementSelected = (element) => {
        this.setState({
            selectedElement: element
        });
    }
    render() {
        const {
            jsonDoc
        } = this.props;
        if (!jsonDoc || !jsonDoc.elements || jsonDoc.elements.length < 1) {
            return  (
                    <h1>
                    No data
                    </h1>
                )
            ;
        }
        var { selectedElement } = this.state;
        if (!selectedElement) {
            selectedElement = jsonDoc.elements[0];
        }
        return  (
                <div className="container">
                    <div className="row">
                        <h1>
                        Schema {jsonDoc.name}
                        </h1>
                    
                        <div className="col-md-2">
                            <div className="well list-well-title">
                            Elements
                            </div>
                        
                            <div className="well list-well-content">
                                <ElementList elements={jsonDoc.elements} selectedElementName={selectedElement.name} onElementSelected={this.handleElementSelected}>
                                </ElementList>
                            
                            </div>
                        
                        </div>
                    
                        <div className="col-md-10">
                            <div style={{
                                overflow: "hidden"
                            }}>
                                <Element element={selectedElement}>
                                </Element>
                            
                            </div>
                        
                        </div>
                    
                    </div>
                
                </div>
            )
        ;
    }
}

const SchemaDocStyled = withStyles(styleSheet)(SchemaDoc)
;
export default SchemaDocStyled;
