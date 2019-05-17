/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\projectstudio\documentlist.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppDrawerNavItem from '../../mui/AppDrawerNavItem';
import {makeFolderList} from '../../../lib/document';
const styles = theme => (
    {
        selected: {
            color: 'red'
        }
    });

class DocumentList extends React.Component {
    render() {
        const {
            classes,
            documents,
            selectedUri,
            onSelectDocument
        } = this.props;
        const folders = makeFolderList(documents);
        console.log('DocumentList.folders', folders);
        return  (
                <div>
                {
                    folders.length === 0 &&  (
                        <h5>
                        none.
                        </h5>
                    )
                    
                }{
                    folders.length > 0 &&  (
                        <List dense={true}>
                        {
                            folders.map((folder) => {
                                return  (
                                        <AppDrawerNavItem title={folder.name}>
                                        {
                                            folder.documents.map((document) => {
                                                return  (
                                                        <AppDrawerNavItem title={document.folder + '/' + document.name + '.' + document.schema + '.ittf' } key={document.uri} className={selectedUri === document.uri ? classes.selected : ''} onClick={() => {
                                                            onSelectDocument(document.uri, document.schema);
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
                    )
                    
                }</div>
            )
        ;
    }
}
export default withStyles(styles)(DocumentList)
;
