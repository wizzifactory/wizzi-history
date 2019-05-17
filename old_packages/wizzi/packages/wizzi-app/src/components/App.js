/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\app.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import AppRouter from './AppRouter';
import {PageInfoContext} from '../utils/withPageInfo';
const styles = theme => (
    {
        pageWrapper: {
            width: '100%', 
            height: '100vh', 
            backgroundColor: theme.palette.background.default, 
            color: theme.palette.primary.main
        }
    });

class AppComponent extends React.Component {
    state = {
        title: 'Wizzi', 
        setTitle: (title) => {
            this.setState({
                title: title
            });
        }
    };
    render() {
        const {
            classes
        } = this.props;
        return  (
                <div className={classes.pageWrapper}>
                    <PageInfoContext.Provider value={this.state}>
                        <AppRouter>
                        </AppRouter>
                    
                    </PageInfoContext.Provider>
                
                </div>
            )
        ;
    }
}
export default withStyles(styles)(AppComponent)
;
