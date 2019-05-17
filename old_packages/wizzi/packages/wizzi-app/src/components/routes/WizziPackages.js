/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\wizzipackages.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import verify from '../../lib/verify';
import { Route } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {getKernelPackages, getPluginsPackages} from '../../store/actions';
import MyLink from '../mui/AppDrawerNavItem';
const styles = theme => (
    {
        root: {
            display: 'flex', 
            flexDirection: 'column', 
            height: '100%', 
            flexGrow: 1
        }, 
        grow: {
            flex: '1 1 auto'
        }, 
        title: {
            marginLeft: 24, 
            flex: '0 1 auto'
        }, 
        appBar: {
            transition: theme.transitions.create('width'), 
            '@media print': {
                position: 'absolute'
            }
        }, 
        appBarShift: {
            [theme.breakpoints.up('lg')]: {
                width: 'calc(100% - 240px)'
            }
        }, 
        drawer: {
            [theme.breakpoints.up('lg')]: {
                width: 240
            }
        }, 
        barHead: {
            marginLeft: '15px'
        }, 
        content: {
            display: 'flex', 
            width: '100%', 
            height: '85%', 
            margin: '10px 0'
        }, 
        column1: {
            flex: '0 1 400px', 
            padding: '20px', 
            height: '100%', 
            overflow: 'auto'
        }, 
        column2: {
            flex: '1', 
            height: '100%', 
            overflow: 'auto'
        }
    });

class WizziPackagesContainer extends React.Component {
    state = {
        selectPackageType: null, 
        selectPackageName: null
    };
    handleSelect = (packageType, packageName) => {
        console.log('WizziPackages.handleSelect.item', packageType, packageName);
        this.setState({
            selectPackageType: packageType, 
            selectPackageName: packageName
        });
    }
    componentDidMount() {
        const {
            dispatchGetKernelPackages,
            dispatchGetPluginsPackages
        } = this.props;
        dispatchGetKernelPackages();
        dispatchGetPluginsPackages();
    }
    render() {
        const {
            classes,
            match,
            kernelPackages,
            pluginsPackages
        } = this.props;
        console.log('WizziPackages.match', match);
        const title = this.state.selectPackageType ? 'Wizzi ' + this.state.selectPackageType + ' package ' : 'Wizzi packages';
        // let disablePermanent = false
        // let navIconClassName = ''
        let appBarClassName = classes.appBar;
        if (title === null) {
            // home route, don't shift app bar or dock drawer
            // set disablePermanent = true
            // set appBarClassName += ` ${classes.appBarHome}`
        }
        else {
            // set navIconClassName = classes.navIconHide
            appBarClassName += ` ${classes.appBarShift}`;
        }
        return  (
                <div className={ classes.root }>
                    <AppBar position="static">
                        <Toolbar>
                        {
                            title !== null &&  (
                                <Typography className={classes.title} variant="title" color="inherit" noWrap>
                                {title}</Typography>
                            )
                            
                        }</Toolbar>
                    
                    </AppBar>
                
                    <div className={ classes.column1 }>
                        <h3>
                        Kernel
                        </h3>
                    
                        <List>
                        {
                            kernelPackages.map((p, i) => {
                                return  (
                                        <MyLink key={i} to={`/wizzikernelpackage/${p.name}`
                                        } title={p.name}>
                                        </MyLink>
                                    )
                                ;
                            })
                        }</List>
                    
                        <h3>
                        Plugins
                        </h3>
                    
                        <List>
                        {
                            pluginsPackages.map((p, i) => {
                                return  (
                                        <MyLink key={i} to={`/wizzipluginpackage/${p.name}`
                                        } title={p.name}>
                                        </MyLink>
                                    )
                                ;
                            })
                        }</List>
                    
                    </div>
                
                </div>
            )
        ;
    }
    }
const WizziPackagesStyled = withStyles(styles)(WizziPackagesContainer)
;
const WizziPackagesContexted = WizziPackagesStyled;
const mapDispatchToProps = (dispatch) => {
    return {
            dispatch: dispatch, 
            dispatchGetKernelPackages: () => {
                console.log('dispatchGetKernelPackages');
                dispatch(getKernelPackages());
            }, 
            dispatchGetPluginsPackages: () => {
                console.log('dispatchGetPluginsPackages');
                dispatch(getPluginsPackages());
            }
        };
};
const mapStateToProps = (state) => {
    return {
            kernelPackages: state.wizziPackages.kernelPackages, 
            pluginsPackages: state.wizziPackages.pluginsPackages
        };
};
const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps, dispatchProps, {});
};
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(WizziPackagesContexted)
;
