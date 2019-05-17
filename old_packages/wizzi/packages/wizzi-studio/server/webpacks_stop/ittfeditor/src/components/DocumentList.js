/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\documentlist.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List, { ListItem, ListItemText } from 'material-ui/List';
const styleSheet = createStyleSheet('DocumentList', theme => (
    {
        selected: {
            color: 'red'
        }
    }));

class DocumentList extends React.Component  {
    render() {
        const {
            classes,
            documents,
            selectedUri,
            onSelectDocument
        } = this.props;
        return  (
                <div>
                {
                    documents.length === 0
                     &&  (
                        <h5>
                        none.
                        </h5>
                    )
                    
                }{
                    documents.length > 0
                     &&  (
                        <List dense={true}>
                        {
                            documents.map((document) => {
                                return  (
                                        <ListItem key={document.uri} className={selectedUri === document.uri ? classes.selected : ''} onClick={() => {
                                            onSelectDocument(document.uri, document.schema);
                                        }}>
                                            <ListItemText primary={document.folder + '/' + document.name + '.' + document.schema + '.ittf' }>
                                            </ListItemText>
                                        
                                        </ListItem>
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

const DocumentListStyled = withStyles(styleSheet)(DocumentList)
;
export default DocumentListStyled;
