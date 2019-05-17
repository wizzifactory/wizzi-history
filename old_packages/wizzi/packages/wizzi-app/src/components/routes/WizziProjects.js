/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\wizziprojects.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import verify from '../../lib/verify';
import { Route } from "react-router-dom";
import Topic from './Topic';
import List from '@material-ui/core/List';
import MyLink from '../mui/AppDrawerNavItem';
const styles = theme => (
    {});

class WizziProjectsContainer extends React.Component {
    handleSelect = (item) => {
        console.log('TreeViewDemo.handleSelect.item', item);
    }
    render() {
        const {
            match,
            projects,
            schemas
        } = this.props;
        return  (
                <div>
                    <h2>
                    Projects
                    </h2>
                
                    <List>
                    {
                        projects.map((p, i) => {
                            return  (
                                    <MyLink key={i} to={`/wizziprojectstudio/${p.name}`
                                    } title={p.name}>
                                    </MyLink>
                                )
                            ;
                        })
                    }</List>
                
                    <h2>
                    Schemas
                    </h2>
                
                    <List>
                    {
                        schemas.map((s, i) => {
                            return  (
                                    <MyLink key={i} to={`/wizzischema/${verify.replaceAll(s.uri, '/', '_')}`
                                    } title={s.name}>
                                    </MyLink>
                                )
                            ;
                        })
                    }</List>
                
                </div>
            )
        ;
    }
    }
const WizziProjectsStyled = WizziProjectsContainer;
const WizziProjectsContexted = WizziProjectsStyled;
const mapDispatchToProps = (dispatch) => {
    return {
            dispatch: dispatch
        };
};
const mapStateToProps = (state) => {
    return {
            schemas: state.commons.schemas, 
            projects: state.commons.projects
        };
};
const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps, dispatchProps, {});
};
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(WizziProjectsContexted)
;
