/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\containers\muithemecontainer.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppContainer from './AppContainer';
// A theme with custom primary and secondary color. It's optional.
const theme = createMuiTheme({
    palette: {
        primary: {
            light: orange[300], 
            main: orange[500], 
            dark: orange[700]
        }, 
        secondary: {
            light: green[300], 
            main: green[500], 
            dark: green[700]
        }, 
        type: 'dark'
    }
});
class MuiThemeContainer extends React.Component {
    render() {
        const {
            dark
        } = this.props;
        return  (
                <MuiThemeProvider theme={theme}>
                    <CssBaseline>
                    </CssBaseline>
                
                    <AppContainer>
                    </AppContainer>
                
                </MuiThemeProvider>
            )
        ;
    }
}
export default connect((state) => {
    return {
            dark: state.dark
        };
})(MuiThemeContainer)
;
