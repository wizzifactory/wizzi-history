/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\codeeditordemo.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
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
    {});

class CodeEditorDemo extends React.Component {
    state = {
        codeSnippet: jsSnippet
    };
    handleCodeChange = (value) => {
        this.setState({
            codeSnippet: value
        });
    }
    render() {
        const { codeSnippet } = this.state;
        return  (
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <CodeEditor language={ 'js' } value={ codeSnippet } onChange={ this.handleCodeChange }>
                                </CodeEditor>
                            
                            </td>
                        
                            <td>
                                <CodeBeautify language={ 'js' } codeSnippet={ codeSnippet }>
                                </CodeBeautify>
                            
                            </td>
                        
                        </tr>
                    
                    </tbody>
                
                </table>
            )
        ;
    }
}
export default withStyles(styles)(CodeEditorDemo)
;
