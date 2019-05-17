/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\schema.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Splitter from './mui/Splitter';
import Select from './mui/Select';
import SchemaDialog from './SchemaDialog';
import SchemaList from './meta/SchemaList';
import SchemaTabs from './meta/SchemaTabs';
import DocumentEditor from './DocumentEditor';
const styleSheet = createStyleSheet('Schema', theme => (
    {
        schema: {
            // @ border '1px solid red'
            // @ padding '2px'
            width: '100%'
        }, 
        dialog: {
            // @ border '1px solid orange'
            // @ padding '2px'
            
        }
    }));

class Schema extends React.Component  {
    state = {
        openSelectSchemaDialog: false, 
        showCreateForm: false, 
        schemaActiveTab: 'doc'
    };
    openCreateForm = () => {
        this.setState({
            ...this.state, 
            showCreateForm: true
        });
    }
    closeCreateForm = () => {
        this.setState({
            ...this.state, 
            showCreateForm: false
        });
    }
    activateSchemaTab = (key) => {
        this.setState({
            ...this.state, 
            schemaActiveTab: key
        });
    }
    handleOpenSelectSchemaDialog = () => {
        this.setState({
            ...this.state, 
            openSelectSchemaDialog: true
        });
    }
    handleCloseSelectSchemaDialog = () => {
        this.setState({
            ...this.state, 
            openSelectSchemaDialog: false
        });
    }
    render() {
        const {
            classes,
            schemas,
            ittfDocument,
            selectedSchemaUri,
            model,
            factory,
            jsonDoc,
            onSelectSchema
        } = this.props;
        const { showCreateForm, schemaActiveTab } = this.state;
        return  (
                <div className={classes.schema}>
                    <Toolbar>
                        <Typography type="title" color='inherit' noWrap>
                        Schema
                        </Typography>
                    
                        <Button raised className={classes.marginLeft_10} title="Select or create schema" onClick={ this.handleOpenSelectSchemaDialog }>
                        {selectedSchemaUri || 'Create' }
                        </Button>
                    
                    </Toolbar>
                
                    <div className={classes.dialog}>
                        <SchemaDialog schemas={schemas} open={this.state.openSelectSchemaDialog} onRequestClose={this.handleCloseSelectSchemaDialog} onSelectSchema={onSelectSchema}>
                        </SchemaDialog>
                    
                    </div>
                
                    <table className="table condensed">
                        <tbody>
                            <tr>
                                <td style={{
                                    width: '20%'
                                }}>
                                    <SchemaList schemas={schemas} onSelectSchema={onSelectSchema} selectedSchemaUri={selectedSchemaUri}>
                                    </SchemaList>
                                
                                </td>
                            
                                <td style={{
                                    width: '80%'
                                }}>
                                    <div>
                                        <Splitter>
                                            <div>
                                                <div>
                                                Schema: {selectedSchemaUri}
                                                </div>
                                            
                                                <DocumentEditor value={ittfDocument}>
                                                </DocumentEditor>
                                            
                                            </div>
                                        
                                            <div>
                                                <SchemaTabs activeTab={schemaActiveTab} jsonDoc={jsonDoc} factory={factory} model={model} onTabSelect={(key) => {
                                                    this.activateSchemaTab(key);
                                                }}>
                                                </SchemaTabs>
                                            
                                            </div>
                                        
                                        </Splitter>
                                    
                                    </div>
                                
                                </td>
                            
                            </tr>
                        
                        </tbody>
                    
                    </table>
                
                </div>
            )
        ;
    }
}

const SchemaStyled = withStyles(styleSheet)(Schema)
;
export default SchemaStyled;
