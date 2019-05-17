/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\formbuilder\ittf\webpacks\formbuilder\src\components\approuter.js.ittf
    utc time: Mon, 10 Jul 2017 12:31:59 GMT
*/
'use strict';
import SampleForm from '../demos/SampleForm';
import ReduxSimpleForm from '../demos/reduxForm/SimpleFormController';
import ReduxSyncValidationForm from '../demos/reduxForm/SyncValidationFormController';
import ReduxFieldLevelValidationForm from '../demos/reduxForm/FieldLevelValidationFormController';
import ReduxSubmitValidationForm from '../demos/reduxForm/SubmitValidationFormController';
import ReduxAsyncValidationForm from '../demos/reduxForm/AsyncValidationFormController';
import ReduxFieldArrayForm from '../demos/reduxForm/FieldArrayFormController';
import ReduxWizardForm from '../demos/reduxForm/WizardFormController';
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
var basepath = '/app/formbuilder';
class AppRouter extends React.Component  {
    render() {
        return  (
                <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
                    <Route title="Form builder" path={basepath + "/"} component={AppFrame}>
                        <IndexRoute dockDrawer component={Home} title={null}>
                        </IndexRoute>
                    
                        <Route title="Getting started" path={basepath + "/getting-started"} nav component={AppContent}>
                            <Route title="Installation" path={basepath + "/getting-started/installation"} component={MarkdownDocs} content={requireMarkdown('./getting-started/installation.md')} nav>
                            </Route>
                        
                            <Route title="Usage" path={basepath + "/getting-started/usage"} component={MarkdownDocs} content={requireMarkdown('./getting-started/usage.md')} nav>
                            </Route>
                        
                            <Route title="Tech reference" path={basepath + "/getting-started/tech-reference"} component={MarkdownDocs} content={requireMarkdown('./getting-started/tech-reference.md')} nav>
                            </Route>
                        
                        </Route>
                    
                        <Route title="Project" path={basepath + "/project"} nav component={AppContent}>
                            <Route title="TODO" path={basepath + "/project/todo"} component={MarkdownDocs} content={requireMarkdown('./project/todo.md')} nav>
                            </Route>
                        
                            <Route title="API" path={basepath + "/project/api"} component={MarkdownDocs} content={requireMarkdown('./project/api.md')} nav>
                            </Route>
                        
                            <Route title="Demo" path={basepath + "/project/demo"} component={MarkdownDocs} content={requireMarkdown('./project/demo.md')} nav>
                            </Route>
                        
                        </Route>
                    
                        <Route title="Demos" path={basepath + "/demos"} nav component={AppContent}>
                            <Route title="Sample form" path={basepath + "/demos/sampleform"} component={SampleForm} nav>
                            </Route>
                        
                            <Route title="Redux simple form" path={basepath + "/demos/reduxSimpleform"} component={ReduxSimpleForm} nav>
                            </Route>
                        
                            <Route title="Redux sync validation" path={basepath + "/demos/reduxSyncValidationForm"} component={ReduxSyncValidationForm} nav>
                            </Route>
                        
                            <Route title="Redux field level validation" path={basepath + "/demos/reduxFieldLevelValidationForm"} component={ReduxFieldLevelValidationForm} nav>
                            </Route>
                        
                            <Route title="Redux submit validation" path={basepath + "/demos/reduxSubmitValidationForm"} component={ReduxSubmitValidationForm} nav>
                            </Route>
                        
                            <Route title="Redux async validation" path={basepath + "/demos/reduxAsyncValidationForm"} component={ReduxAsyncValidationForm} nav>
                            </Route>
                        
                            <Route title="Redux field array form" path={basepath + "/demos/reduxFieldArrayForm"} component={ReduxFieldArrayForm} nav>
                            </Route>
                        
                            <Route title="Redux wizard form" path={basepath + "/demos/reduxWizardForm"} component={ReduxWizardForm} nav>
                            </Route>
                        
                        </Route>
                    
                    </Route>
                
                </Router>
            )
        ;
    }
}
export default AppRouter;
