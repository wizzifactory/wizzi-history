/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\containers\app.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MuiThemeProvider, { MUI_SHEET_ORDER } from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import { orange, red } from 'material-ui/colors';
import { lightTheme, darkTheme, setPrismTheme } from '../utils/prism';
import AppRouter from '../components/AppRouter';
let styleManager;
class App extends React.Component  {
    render() {
        const { dark } = this.props;
        const palette = createPalette({
            primary: orange, 
            accent: red, 
            type: (dark ? 'dark' : 'light')
        });
        const theme = createMuiTheme({
            palette
        });
        if (!styleManager) {
            const themeContext = MuiThemeProvider.createDefaultContext({
                theme
            });
            styleManager = themeContext.styleManager;
        }
        else {
            styleManager.updateTheme(theme);
        }
        styleManager.setSheetOrder(MUI_SHEET_ORDER.concat([]));
        if (dark) {
            setPrismTheme(darkTheme);
        }
        else {
            setPrismTheme(lightTheme);
        }
        return  (
                <MuiThemeProvider theme={theme} styleManager={styleManager}>
                    <div>
                        <h1>
                        Wizzi factory
                        </h1>
                    
                        <AppRouter>
                        </AppRouter>
                    
                    </div>
                
                </MuiThemeProvider>
            )
        ;
    }
}
export default connect((state) => {
    return {
            dark: state.dark
        };
})(App)
;
