/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\codeeditsplit2.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import verify from '../../lib/verify';
import { Route } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Splitter from '../mui/Splitter';
import CodeBeautify from '../mui/CodeBeautify';
import CodeEditor from '../mui/CodeEditor';
const initialCode = [
    "import Lowlight from 'react-lowlight'", 
    "", 
    "// Load any languages you want to use", 
    "// (see https://github.com/isagalaev/highlight.js/tree/master/src/languages)", 
    "import js from 'highlight.js/lib/languages/javascript", 
    "", 
    "// Then register them with lowlight", 
    "Lowlight.registerLanguage('js', js)", 
    "", 
    "ReactDOM.render(<Lowlight language='js' value='/* Code to highlight */' />,", 
    "  document.getElementById('target')", 
    ")"
].join('\n');
const styles = theme => (
    {
        split2_wrapper: {
            width: '100%', 
            height: '75vh', 
            backgroundColor: '#1d1f20', 
            display: 'flex', 
            flexDirection: 'column', 
            margin: '10px 0'
        }, 
        editorbox: {
            margin: '.5vw .5vw', 
            flex: '1 auto', 
            display: 'flex', 
            height: '100%', 
            flexDirection: 'column'
        }, 
        editorHead: {
            margin: '4px', 
            backgroundColor: '#0a0a0a', 
            height: '64px', 
            width: '100%'
        }, 
        split2_pane1: {
            margin: '10px 5px', 
            height: '100%', 
            overflow: 'auto'
        }, 
        split2_pane2: {
            margin: '10px 5px', 
            height: '100%', 
            overflow: 'auto'
        }
    });

class CodeEditSplit2 extends React.Component {
    state = {
        codeSnippet: initialCode, 
        splitter1Sizes: {
            primary: 500, 
            secondary: 500
        }
    };
    handleSplitter1Resize = (sizes) => {
        console.log('handleSplitter1Resize', sizes);
        this.setState({
            splitter1Sizes: sizes
        });
    }
    handleCodeChange = (value) => {
        this.setState({
            codeSnippet: value
        });
    }
    render() {
        const {
            classes
        } = this.props;
        const { codeSnippet, splitter1Sizes } = this.state;
        const editOptions = {};
        return  (
                <div className={classes.split2_wrapper}>
                    <Splitter split="vertical" secondaryInitialSize={ 700 } primaryMinSize={200} secondaryMinSize={700} onResize={ this.handleSplitter1Resize }>
                        <div className={classes.editorbox}>
                            <div className={classes.editorHead}>
                                <Paper>
                                    <Toolbar>
                                        <Grid container direction="row" justify="flex-start" alignContent="flex-start" alignItems="flex-start">
                                        </Grid>
                                    
                                    </Toolbar>
                                
                                </Paper>
                            
                            </div>
                        
                            <div className={classes.split2_pane1}>
                                <CodeEditor theme='vs-dark' width={ splitter1Sizes.primary } height={ splitter1Sizes.third } value={ codeSnippet } options={ editOptions } onChange={ this.handleCodeChange }>
                                </CodeEditor>
                            
                            </div>
                        
                        </div>
                    
                        <div className={classes.editorbox}>
                            <div className={classes.editorHead}>
                                <Paper>
                                    <Toolbar>
                                        <Grid container direction="row" justify="flex-start" alignContent="flex-start" alignItems="flex-start">
                                        </Grid>
                                    
                                    </Toolbar>
                                
                                </Paper>
                            
                            </div>
                        
                            <div className={classes.split2_pane2}>
                                <CodeBeautify language={ 'js' } codeSnippet={ codeSnippet }>
                                </CodeBeautify>
                            
                            </div>
                        
                        </div>
                    
                    </Splitter>
                
                </div>
            )
        ;
    }
}
export default withStyles(styles)(CodeEditSplit2)
;
