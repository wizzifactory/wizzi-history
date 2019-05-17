/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\wf\ittf\webpacks\wf\src\components\approuter.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:42 GMT
*/
'use strict';
import Wizzifier from '../containers/WizzifierContainer';
import ExecFiles from '../containers/ExecFilesContainer';
import Console from '../containers/ConsoleContainer';
import NpmJobs from '../containers/NpmJobsContainer';
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
var basepath = '/app/wf';
class AppRouter extends React.Component  {
    render() {
        return  (
                <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
                    <Route title="Wizzi factory" path={basepath + "/"} component={AppFrame}>
                        <IndexRoute dockDrawer component={Home} title={null}>
                        </IndexRoute>
                    
                        <Route title="Getting started" path={basepath + "/getting-started"} nav>
                            <Route title="Installation" path={basepath + "/getting-started/installation"} component={MarkdownDocs} content={requireMarkdown('./getting-started/installation.md')} nav>
                            </Route>
                        
                            <Route title="Usage" path={basepath + "/getting-started/usage"} component={MarkdownDocs} content={requireMarkdown('./getting-started/usage.md')} nav>
                            </Route>
                        
                            <Route title="Tech reference" path={basepath + "/getting-started/tech-reference"} component={MarkdownDocs} content={requireMarkdown('./getting-started/tech-reference.md')} nav>
                            </Route>
                        
                        </Route>
                    
                        <Route title="Project" path={basepath + "/project"} nav>
                            <Route title="TODO" path={basepath + "/project/todo"} component={MarkdownDocs} content={requireMarkdown('./project/todo.md')} nav>
                            </Route>
                        
                            <Route title="API" path={basepath + "/project/api"} component={MarkdownDocs} content={requireMarkdown('./project/api.md')} nav>
                            </Route>
                        
                            <Route title="Demo" path={basepath + "/project/demo"} component={MarkdownDocs} content={requireMarkdown('./project/demo.md')} nav>
                            </Route>
                        
                        </Route>
                    
                        <Route title="Tools" path={basepath + "/tools"} nav>
                            <Route title="Wizzifier" path={basepath + "/tools/wizzifier"} component={Wizzifier} nav>
                            </Route>
                        
                        </Route>
                    
                        <Route title="Jobs" path={basepath + "/jobs"} nav>
                            <Route title="Execute files" path={basepath + "/jobs/execfiles"} component={ExecFiles} nav>
                            </Route>
                        
                            <Route title="Execute console scripts" path={basepath + "/jobs/console"} component={Console} nav>
                            </Route>
                        
                            <Route title="Npm jobs" path={basepath + "/jobs/npmjobs"} component={NpmJobs} nav>
                            </Route>
                        
                        </Route>
                    
                    </Route>
                
                </Router>
            )
        ;
    }
}
export default AppRouter;
