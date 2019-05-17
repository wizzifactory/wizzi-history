/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\documentlist2.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
import AppDrawerNavItem from './muidocs/AppDrawerNavItem';
import {makeFolderList} from '../lib/document';
const styleSheet = createStyleSheet('DocumentList2', theme => (
    {
        selected: {
            color: 'red'
        }
    }));

class DocumentList2 extends React.Component  {
    render() {
        const {
            classes,
            documents,
            selectedUri,
            onSelectDocument
        } = this.props;
        const folders = makeFolderList(documents);
        console.log('DocumentList2.folders', folders);
        return  (
                <div>
                {
                    folders.length === 0
                     &&  (
                        <h5>
                        none.
                        </h5>
                    )
                    
                }{
                    folders.length > 0
                     &&  (
                        <List dense={true}>
                        {
                            folders.map((folder) => {
                                return  (
                                        <AppDrawerNavItem title={folder.name}>
                                        {
                                            folder.documents.map((document) => {
                                                return  (
                                                        <AppDrawerNavItem title={document.folder + '/' + document.name + '.' + document.schema + '.ittf' } key={document.uri} className={selectedUri === document.uri ? classes.selected : ''} to={document.uri} onClick={() => {
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

const DocumentList2Styled = withStyles(styleSheet)(DocumentList2)
;
export default DocumentList2Styled;
