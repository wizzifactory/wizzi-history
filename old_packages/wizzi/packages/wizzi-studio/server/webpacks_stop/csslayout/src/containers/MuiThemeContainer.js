/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\csslayout\ittf\webpacks\csslayout\src\containers\muithemecontainer.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:51 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider, { MUI_SHEET_ORDER } from 'material-ui/styles/MuiThemeProvider';
import { createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import { orange, red } from 'material-ui/colors';
import { lightTheme, darkTheme, setPrismTheme } from '../utils/prism';
import AppContainer from '../components/App';
let styleManager;
class MuiThemeContainer extends React.Component  {
    render() {
        const dark = false;
        const palette = createPalette({
            primary: orange, 
            accent: red, 
            type: (dark ? 'dark' : 'light')
        })
        ;
        const theme = createMuiTheme({
            palette
        })
        ;
        if (!styleManager) {
            const themeContext = MuiThemeProvider.createDefaultContext({
                theme
            })
            ;
            styleManager = themeContext.styleManager;
        }
        else {
            styleManager.updateTheme(theme);
        }
        styleManager.setSheetOrder(MUI_SHEET_ORDER.concat([])
        );
        if (dark) {
            setPrismTheme(darkTheme);
        }
        else {
            setPrismTheme(lightTheme);
        }
        return  (
                <MuiThemeProvider theme={theme} styleManager={styleManager}>
                    <div>
                        <AppContainer>
                        </AppContainer>
                    
                    </div>
                
                </MuiThemeProvider>
            )
        ;
    }
}
export default MuiThemeContainer;
