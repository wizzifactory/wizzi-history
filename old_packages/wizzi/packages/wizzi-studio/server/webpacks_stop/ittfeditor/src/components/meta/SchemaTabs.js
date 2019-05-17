/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\meta\schematabs.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import DocumentEditor from '../DocumentEditor';
import SchemaDoc from './SchemaDoc';
import TabContainer from '../mui/TabContainer';
const styleSheet = createStyleSheet('SchemaTabs', theme => (
    {
        root: {
            flexGrow: 1, 
            marginTop: theme.spacing.unit * 3, 
            backgroundColor: theme.palette.background.paper
        }
    }));

class SchemaTabs extends React.Component  {
    state = {
        index: 0
    };
    handleChange = (event, index) => {
        this.setState({
            index
        });
        if (this.props.onTabSelect) {
            this.props.onTabSelect(index);
        }
    }
    render() {
        const {
            classes,
            activeTab,
            onTabSelect,
            jsonDoc,
            model,
            factory
        } = this.props;
        const jsonText = jsonDoc ? JSON.stringify(jsonDoc, null, 4) : 'Json';
        ;
        return  (
                <div className={classes.root}>
                    <AppBar position="static">
                        <Tabs index={this.state.index} onChange={this.handleChange}>
                            <Tab label="Doc">
                            </Tab>
                        
                            <Tab label="Model">
                            </Tab>
                        
                            <Tab label="Factory">
                            </Tab>
                        
                            <Tab label="Json">
                            </Tab>
                        
                        </Tabs>
                    
                    </AppBar>
                
                {
                    this.state.index === 0
                     &&  (
                        <TabContainer>
                            <SchemaDoc jsonDoc={jsonDoc}>
                            </SchemaDoc>
                        
                        </TabContainer>
                    )
                    
                }{
                    this.state.index === 1
                     &&  (
                        <TabContainer>
                            <DocumentEditor value={model}>
                            </DocumentEditor>
                        
                        </TabContainer>
                    )
                    
                }{
                    this.state.index === 2
                     &&  (
                        <TabContainer>
                            <DocumentEditor value={factory}>
                            </DocumentEditor>
                        
                        </TabContainer>
                    )
                    
                }{
                    this.state.index === 3
                     &&  (
                        <TabContainer>
                            <DocumentEditor value={jsonText}>
                            </DocumentEditor>
                        
                        </TabContainer>
                    )
                    
                }</div>
            )
        ;
    }
}

const SchemaTabsStyled = withStyles(styleSheet)(SchemaTabs)
;
export default SchemaTabsStyled;
