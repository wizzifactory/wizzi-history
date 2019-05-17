/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\_old_approuter.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { applyRouterMiddleware, browserHistory, Router, Route, IndexRoute, } from 'react-router';
import { useScroll } from 'react-router-scroll';
import AppFrame from './AppFrame';
import Home from '../pages/Home';
import AppContent from './muidocs/AppContent';
import FactoryContent from './FactoryContent';
import MarkdownDocs from './muidocs/MarkdownDocs';
import { requireMarkdown } from './files';
import DocumentContainer from '../containers/DocumentContainer';
import SchemaContainer from '../containers/SchemaContainer';
const styleSheet = createStyleSheet('AppRouter', theme => (
    {}));

class AppRouter extends React.Component  {
    render() {
        return  (
                <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
                    <Route title="Wizzi Factory" path={"/"} component={AppFrame}>
                        <IndexRoute dockDrawer component={Home} title={null}>
                        </IndexRoute>
                    
                        <Route title="The factory" path={"/factory"} nav>
                            <Route title="Document editor" path={"/factory/document-editor"} nav component={DocumentContainer}>
                            </Route>
                        
                            <Route title="Schema browser" path={"/factory/schema-browser"} nav component={SchemaContainer}>
                            </Route>
                        
                        </Route>
                    
                        <Route title="Getting Started" path={"/getting-started"} nav component={AppContent}>
                            <Route title="Installation" path={"/getting-started/installation"} content={requireMarkdown('./getting-started/installation.md')} component={MarkdownDocs} nav>
                            </Route>
                        
                            <Route title="Usage" path={"/getting-started/usage"} content={requireMarkdown('./getting-started/usage.md')} component={MarkdownDocs} nav>
                            </Route>
                        
                            <Route title="Examples" path={"/getting-started/examples"} content={requireMarkdown('./getting-started/examples.md')} component={MarkdownDocs} nav>
                            </Route>
                        
                            <Route title="References" path={"/getting-started/references"} content={requireMarkdown('./getting-started/references.md')} component={MarkdownDocs} nav>
                            </Route>
                        
                        </Route>
                    
                        <Route title="Project" path={"/project"} nav component={AppContent}>
                            <Route title="TODO" path={basepath + "/project/todo"} component={MarkdownDocs} content={requireMarkdown('./project/todo.md')} nav>
                            </Route>
                        
                            <Route title="API" path={basepath + "/project/api"} component={MarkdownDocs} content={requireMarkdown('./project/api.md')} nav>
                            </Route>
                        
                            <Route title="Demo" path={basepath + "/project/demo"} component={MarkdownDocs} content={requireMarkdown('./project/demo.md')} nav>
                            </Route>
                        
                        </Route>
                    
                    </Route>
                
                </Router>
            )
        ;
    }
}

const AppRouterStyled = withStyles(styleSheet)(AppRouter)
;
export default AppRouterStyled;
