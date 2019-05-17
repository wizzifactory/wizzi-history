/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v4\apps-wizzi\v4-solutions\wf\ittf\webpacks\wf\src\components\execfiles.js.ittf
    utc time: Mon, 10 Jul 2017 12:51:42 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import AppDrawerNavItem from './muidocs/AppDrawerNavItem';
import DocumentEditor from './DocumentEditor';
const styleSheet = createStyleSheet('ExecFiles', theme => (
    {
        content: theme.mixins.gutters({
            paddingTop: 80, 
            flex: '1 1 100%', 
            maxWidth: '100%', 
            margin: '0 auto'
        })
        , 
        selected: {
            color: 'red'
        }
    }));

class ExecFiles extends React.Component  {
    render() {
        const {
            classes,
            isRequestingList,
            isRequestingRun,
            jobmodels,
            jobfiles,
            listerror,
            selectedExecFile,
            stdout,
            stderr,
            onRunRequest
        } = this.props;
        return  (
                <div className={classes.content}>
                    <List dense={true}>
                    {
                        jobmodels.map((jobmodel) => {
                            return  (
                                    <AppDrawerNavItem title={jobmodel.title}>
                                    {
                                        jobmodel.execFiles.map((execFile) => {
                                            return  (
                                                    <AppDrawerNavItem title={execFile.wzName + ' / ' + execFile.title } key={execFile.wzName} to={execFile.wzName} className={selectedExecFile === execFile.wzName ? classes.selected : ''} onClick={() => {
                                                        onRunRequest(execFile.wzName)
                                                    }}>
                                                    </AppDrawerNavItem>
                                                )
                                            ;
                                        })
                                        
                                    }</AppDrawerNavItem>
                                )
                            ;
                        })
                        
                    }</List>
                
                {
                    stdout || stderr
                     &&  (
                        <div>
                            <h2>
                            { 'Execution of file ' + selectedExecFile }
                            </h2>
                        
                            <DocumentEditor value={stdout + '\n' + stderr}>
                            </DocumentEditor>
                        
                        </div>
                    )
                    
                }</div>
            )
        ;
    }
}

const ExecFilesStyled = withStyles(styleSheet)(ExecFiles)

;
export default ExecFilesStyled;
