/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi-studio-express\wizzi\ittf\server\webpacks\home\src\components\appsearch.js.ittf
    utc time: Mon, 20 Aug 2018 16:09:59 GMT
*/
'use strict';
import React from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import PropTypes from 'prop-types';
import withWidth, { isWidthUp } from 'material-ui/utils/withWidth';
import Search from 'material-ui-icons/Search';
import { white } from 'material-ui/styles/colors';
import { fade } from 'material-ui/styles/colorManipulator';
import { withStyles, createStyleSheet } from 'material-ui/styles';
let docsearchDisplay = false;
let searchTimer;
function initDocsearch() {
    if (docsearchDisplay) {
        return ;
    }
    docsearchDisplay = true;
    searchTimer = setInterval(() => {
        if (window.docsearch && document.querySelector('#docsearch-input')) {
            clearInterval(searchTimer);
            window.docsearch({
                apiKey: '1d8534f83b9b0cfea8f16498d19fbcab', 
                indexName: 'material-ui', 
                inputSelector: '#docsearch-input', 
                debug: false// Set debug to true if you want to inspect the dropdown
                
            });
        }
    }, 100);
}
function removeDocsearch() {
    docsearchDisplay = false;
    clearInterval(searchTimer);
}
var styleSheet = createStyleSheet('AppSearch', (theme) => {
    return {
            '@global': {
                '.algolia-autocomplete': {
                    fontFamily: theme.typography.fontFamily, 
                    '& .algolia-docsearch-suggestion--title': {
                        ...theme.typography.title
                    }, 
                    '& .algolia-docsearch-suggestion--text': {
                        ...theme.typography.body1
                    }, 
                    '& .ds-dropdown-menu': {
                        boxShadow: theme.shadows[1], 
                        borderRadius: 2, 
                        '&::before': {
                            display: 'none'
                        }, 
                        '& [class^=ds-dataset-]': {
                            border: 0, 
                            borderRadius: 2
                        }
                    }
                }
            }, 
            wrapper: {
                fontFamily: theme.typography.fontFamily, 
                position: 'relative', 
                borderRadius: 2, 
                background: fade(white, 0.15), 
                '&:hover': {
                    background: fade(white, 0.25)
                }, 
                '& $input': {
                    transition: theme.transitions.create('width'), 
                    width: 200, 
                    '&:focus': {
                        width: 250
                    }
                }
            }, 
            search: {
                width: theme.spacing.unit * 9, 
                height: '100%', 
                position: 'absolute', 
                pointerEvents: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
            }, 
            input: {
                font: 'inherit', 
                padding: `${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit}px ${theme.spacing.unit * 9}px`, 
                border: 0, 
                display: 'block', 
                verticalAlign: 'middle', 
                whiteSpace: 'normal', 
                background: 'none', 
                margin: 0, 
                color: 'inherit', 
                width: '100%', 
                '&:focus': {
                    outline: 0
                }
            }
        };
});
function AppSearch(props) {
    const { classes, width } = props;
    if (!isWidthUp('sm', width)) {
        removeDocsearch();
        return null;
    }
    initDocsearch();
    return  (
            <div className={classes.wrapper}>
                <div className={classes.search}>
                    <Search>
                    </Search>
                
                </div>
            
                <input id="docsearch-input" className={classes.input}>
                </input>
            
            </div>
        )
    ;
}
AppSearch.propTypes = {
    classes: PropTypes.object.isRequired, 
    width: PropTypes.string.isRequired
};
export default compose(pure, withStyles(styleSheet), withWidth())(AppSearch)
;