/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\routes\drawers\tiledata.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
// This file is shared across the demos.
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
export const mailFolderListItems =  (
    <div>
        <ListItem button>
            <ListItemIcon>
                <InboxIcon>
                </InboxIcon>
            
            </ListItemIcon>
        
            <ListItemText primary="Inbox">
            </ListItemText>
        
        </ListItem>
    
        <ListItem button>
            <ListItemIcon>
                <StarIcon>
                </StarIcon>
            
            </ListItemIcon>
        
            <ListItemText primary="Starred">
            </ListItemText>
        
        </ListItem>
    
        <ListItem button>
            <ListItemIcon>
                <SendIcon>
                </SendIcon>
            
            </ListItemIcon>
        
            <ListItemText primary="Send mail">
            </ListItemText>
        
        </ListItem>
    
        <ListItem button>
            <ListItemIcon>
                <DraftsIcon>
                </DraftsIcon>
            
            </ListItemIcon>
        
            <ListItemText primary="Drafts">
            </ListItemText>
        
        </ListItem>
    
    </div>
)
;
;
export const otherMailFolderListItems =  (
    <div>
        <ListItem button>
            <ListItemIcon>
                <MailIcon>
                </MailIcon>
            
            </ListItemIcon>
        
            <ListItemText primary="All mail">
            </ListItemText>
        
        </ListItem>
    
        <ListItem button>
            <ListItemIcon>
                <DeleteIcon>
                </DeleteIcon>
            
            </ListItemIcon>
        
            <ListItemText primary="Trash">
            </ListItemText>
        
        </ListItem>
    
        <ListItem button>
            <ListItemIcon>
                <ReportIcon>
                </ReportIcon>
            
            </ListItemIcon>
        
            <ListItemText primary="Spam">
            </ListItemText>
        
        </ListItem>
    
    </div>
)
;
;
