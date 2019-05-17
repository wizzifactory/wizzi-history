/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\approuter.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { applyRouterMiddleware, browserHistory, Router, Route, IndexRoute, } from 'react-router';
import { useScroll } from 'react-router-scroll';
import AppFrame from './AppFrame';
import Home from '../pages/Home';
import AppContent from './muidocs/AppContent';
import MarkdownDocs from './muidocs/MarkdownDocs';
import { requireMarkdown } from './files';
import DocumentContainer from '../containers/DocumentContainer';
import SchemaContainer from '../containers/SchemaContainer';
var basepath = '';
class AppRouter extends React.Component  {
    render() {
        return  (
                <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
                    <Route title="Ittf editor" path={basepath + "/"} component={AppFrame}>
                        <IndexRoute dockDrawer component={Home} title={null}>
                        </IndexRoute>
                    
                        <Route title="The factory" path={"/factory"} nav component={AppContent}>
                            <Route title="Dashboard" path="/privacy-policy" component={() => window.location = '/ittf/home/index.html.ittf'} nav>
                            </Route>
                        
                            <Route title="Document editor" path={basepath + "/factory/document-editor"} component={DocumentContainer} nav>
                            </Route>
                        
                            <Route title="Schema browser" path={basepath + "/factory/schema-browser"} component={SchemaContainer} nav>
                            </Route>
                        
                        </Route>
                    
                        <Route title="Getting started" path={"/getting-started"} nav component={AppContent}>
                            <Route title="Installation" path={basepath + "/getting-started/installation"} component={MarkdownDocs} content={requireMarkdown('./getting-started/installation.md')} nav>
                            </Route>
                        
                            <Route title="Usage" path={basepath + "/getting-started/usage"} component={MarkdownDocs} content={requireMarkdown('./getting-started/usage.md')} nav>
                            </Route>
                        
                            <Route title="Tech reference" path={basepath + "/getting-started/references"} component={MarkdownDocs} content={requireMarkdown('./getting-started/references.md')} nav>
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
                    
                        <Route title="Demos" path={"/demos"} nav component={AppContent}>
                        </Route>
                    
                    </Route>
                
                </Router>
            )
        ;
    }
}
export default AppRouter;
