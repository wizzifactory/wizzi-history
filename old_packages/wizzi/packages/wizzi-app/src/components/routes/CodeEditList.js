/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\codeeditlist.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Splitter from '../mui/Splitter';
import CodeBeautify from '../mui/CodeBeautify';
import CodeEditor from '../mui/CodeEditor';
const jsSnippet = [
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
        pageWrapper: {
            width: '100%', 
            height: '100vh', 
            backgroundColor: '#1d1f20', 
            display: 'flex', 
            flexDirection: 'column'
        }, 
        workarea: {
            flex: '1 auto', 
            display: 'flex'
        }, 
        editaside: {
            width: '30px', 
            backgroundColor: '#0d0a10', 
            flex: '0 1 auto', 
            height: 'calc(100vh - 118px)'
        }, 
        editorbox: {
            margin: '.5vw .5vw', 
            flex: '1 auto', 
            display: 'flex', 
            flexDirection: 'column'
        }, 
        editorHead: {
            margin: '4px', 
            backgroundColor: '#0a0a0a', 
            height: '40px', 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'flex-end'
        }
    });

class CodeEditList extends React.Component {
    state = {
        codeSnippet: jsSnippet, 
        splitter1Sizes: {
            primary: 500, 
            secondary: 500
        }
    };
    handleCodeChange = (value) => {
        this.setState({
            codeSnippet: value
        });
    }
    handleSplitter1Resize = (sizes) => {
        console.log('handleSplitter1Resize', sizes);
        this.setState({
            splitter1Sizes: sizes
        });
    }
    render() {
        const {
            classes
        } = this.props;
        const { codeSnippet, splitter1Sizes } = this.state;
        const editOptions = {};
        return  (
                <div className={classes.pageWrapper}>
                    <div className={classes.workarea}>
                        <Splitter split="vertical" secondaryInitialSize={ 500 } primaryMinSize={100} secondaryMinSize={100} totalSize={ splitter1Sizes.secondary } onResize={ this.handleSplitter1Resize }>
                            <div className={classes.editorbox}>
                                <div className={classes.editorHead}>
                                </div>
                            
                                <CodeEditor theme='vs-dark' width={ splitter1Sizes.primary } height={ splitter1Sizes.third } value={ codeSnippet } options={ editOptions } onChange={ this.handleCodeChange }>
                                </CodeEditor>
                            
                            </div>
                        
                            <div className={classes.editorbox}>
                                <div className={classes.editorHead}>
                                </div>
                            
                                <CodeBeautify language={ 'js' } codeSnippet={ codeSnippet }>
                                </CodeBeautify>
                            
                            </div>
                        
                        </Splitter>
                    
                    </div>
                
                </div>
            )
        ;
    }
}
export default withStyles(styles)(CodeEditList)
;
