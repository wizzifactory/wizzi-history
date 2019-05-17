/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\wf\ittf\webpacks\wf\src\components\wizzifier.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:42 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Splitter from './mui/Splitter';
import DocumentEditor from './DocumentEditor';
const wizzifyTypes = [
    'Js', 
    'Html', 
    'Css', 
    'Xml'
];
const styleSheet = createStyleSheet('Wizzifier', theme => (
    {
        source: {
            border: '1px solid red', 
            padding: '3px', 
            margin: '3px'
        }, 
        toolbar: {
            border: '1px solid green', 
            padding: '3px', 
            margin: '3px'
        }, 
        editor: {
            border: '1px solid magenta', 
            padding: '3px', 
            margin: '3px'
        }, 
        wizzified: {
            border: '1px solid violet', 
            padding: '3px', 
            margin: '3px'
        }, 
        marginLeft_10: {
            marginLeft: 10
        }
    }));

class Wizzifier extends React.Component  {
    state = {
        wizzifyIndex: 0, 
        sources: [], 
        checked: []
    };
    handleChangeWizzifyType = (event, index) => {
        console.log('handleChangeWizzifyType', index, wizzifyTypes[index]);
        this.setState({
            ...this.state, 
            wizzifyIndex: index
        })
    }
    handleSourceChange = (value) => {
        console.log('handleSourceChange', value, this.state);
        const i = this.state.wizzifyIndex;
        var newsources = this.state.sources;
        newsources[i] = value;
        this.setState({
            ...this.state, 
            sources: newsources
        })
    }
    handleExecuteWizzify = () => {
        const i = this.state.wizzifyIndex;
        console.log('handleExecuteWizzify', wizzifyTypes[i], this.props.onWizzify);
        this.props.onWizzify(i, this.state.sources[i], this.state.checked[i])
    }
    handleCopyWizzified = () => {
    }
    render() {
        const {
            classes,
            isRequesting,
            lastSourceArray,
            wizzifiedArray
        } = this.props;
        console.log('render', isRequesting, lastSourceArray, wizzifiedArray, this.props);
        const i = this.state.wizzifyIndex;
        const requesting = isRequesting == i;
        const sourceContent = this.state.sources[i] || lastSourceArray[i] || '';
        const wizzifiedContent =  wizzifiedArray[i] || '';
        return  (
                <div>
                    <h2>
                    Hello from wizzifier
                    </h2>
                
                    <Splitter>
                        <div className={classes.source}>
                            <div className={classes.toolbar}>
                                <AppBar position="static">
                                    <Tabs index={this.state.wizzifyIndex} onChange={this.handleChangeWizzifyType}>
                                        <Tab label={wizzifyTypes[0]}>
                                        </Tab>
                                    
                                        <Tab label={wizzifyTypes[1]}>
                                        </Tab>
                                    
                                        <Tab label={wizzifyTypes[2]}>
                                        </Tab>
                                    
                                        <Tab label={wizzifyTypes[3]}>
                                        </Tab>
                                    
                                    </Tabs>
                                
                                </AppBar>
                            
                            </div>
                        
                            <div className={classes.editor}>
                                <DocumentEditor value={sourceContent} onChange={this.handleSourceChange}>
                                </DocumentEditor>
                            
                            </div>
                        
                        </div>
                    
                        <div className={classes.wizzified}>
                            <div>
                                <Toolbar>
                                    <Button raised title="execute wizzify" onClick={ this.handleExecuteWizzify }>
                                    { 'Wizzify ' + wizzifyTypes[this.state.wizzifyIndex] }
                                    </Button>
                                
                                    <Button raised title="copy wizzified" onClick={ this.handleCopyWizzified }>
                                    Copy
                                    </Button>
                                
                                </Toolbar>
                            
                                <DocumentEditor value={wizzifiedContent}>
                                </DocumentEditor>
                            
                            </div>
                        
                        </div>
                    
                    </Splitter>
                
                </div>
            )
        ;
    }
}

const WizzifierStyled = withStyles(styleSheet)(Wizzifier)

;
export default WizzifierStyled;
