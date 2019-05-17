/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\wizzischemaview.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import verify from '../../lib/verify';
import {getSchema} from '../../store/actions';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CodeBeautify from '../mui/CodeBeautify';
const styles = theme => (
    {
        root: {
            flexGrow: 1, 
            backgroundColor: theme.palette.background.paper
        }, 
        scrollBox: {
            overflow: 'auto'
        }
    });

class WizziSchemaViewContainer extends React.Component {
    state = {
        value: 0
    };
    componentDidMount() {
        const {
            match,
            dispatchGetSchema
        } = this.props;
        const schemaUri = verify.replaceAll(match.params.schemaUri, '_', '/');
        dispatchGetSchema(schemaUri);
    }
    handleChange = (event, value) => {
        this.setState({
            value: value
        });
    }
    render() {
        const {
            match,
            classes,
            ittfDocument,
            model,
            factory,
            jsonDoc
        } = this.props;
        const {value} = this.state;
        return  (
                <div>
                    <h1>
                    Schema {match.params.schemaUri}
                    </h1>
                
                    <div className={classes.root}>
                        <AppBar position="static">
                            <Tabs value={value} onChange={this.handleChange}>
                                <Tab label="Ittf source">
                                </Tab>
                            
                                <Tab label="Model">
                                </Tab>
                            
                                <Tab label="Factory">
                                </Tab>
                            
                                <Tab label="Json model">
                                </Tab>
                            
                            </Tabs>
                        
                        </AppBar>
                    
                    {
                        value === 0 &&  (
                            <pre className="classes.scrollBox">
                            {ittfDocument}</pre>
                        )
                        
                    }{
                        value === 1 &&  (
                            <CodeBeautify language={ 'js' } codeSnippet={ model }>
                            </CodeBeautify>
                        )
                        
                    }{
                        value === 2 &&  (
                            <CodeBeautify language={ 'js' } codeSnippet={ factory }>
                            </CodeBeautify>
                        )
                        
                    }{
                        value === 3 &&  (
                            <pre className="classes.scrollBox">
                            {JSON.stringify(jsonDoc, null, 2)}</pre>
                        )
                        
                    }</div>
                
                </div>
            )
        ;
    }
    }
const WizziSchemaViewStyled = withStyles(styles)(WizziSchemaViewContainer)
;
const WizziSchemaViewContexted = WizziSchemaViewStyled;
const mapDispatchToProps = (dispatch) => {
    return {
            dispatch: dispatch, 
            dispatchGetSchema: (schemaUri) => {
                console.log('dispatchGetSchema', schemaUri);
                dispatch(getSchema(schemaUri));
            }
        };
};
const mapStateToProps = (state) => {
    return {
            selectedSchemaUri: state.schema.selectedSchemaUri, 
            ittfDocument: state.schema.ittfDocument, 
            model: state.schema.model, 
            factory: state.schema.factory, 
            jsonDoc: state.schema.jsonDoc
        };
};
const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps, dispatchProps, {});
};
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(WizziSchemaViewContexted)
;
