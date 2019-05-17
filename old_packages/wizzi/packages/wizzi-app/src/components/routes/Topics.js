/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\topics.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Topic from './Topic';
import List from '@material-ui/core/List';
import MyLink from '../mui/AppDrawerNavItem';
const Topics = ({ match }) => (
        <div>
            <h2>
            Topics</h2>
        
            <List>
                <MyLink to={`${match.url}/rendering`
                } title="Rendering with React">
                </MyLink>
            
                <MyLink to={`${match.url}/components`
                } title="Components">
                </MyLink>
            
                <MyLink to={`${match.url}/props-v-state`
                } title="Props v. State">
                </MyLink>
            
            </List>
        
            <Route path={`${match.url}/:topicId`
            } component={Topic}>
            </Route>
        
            <Route exact path={match.url} render={() => (
                    <h3>
                    Please select a topic.</h3>
                )}>
            </Route>
        
        </div>
    );
export default Topics;
