/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\wizzi-studio-express\wizzi\ittf\server\webpacks\home\src\components\apimenucomponents.js.ittf
    utc time: Mon, 20 Aug 2018 16:09:59 GMT
*/
'use strict';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import { kebabCase } from '../utils/helpers';
class ApiMenuComponents extends Component {
    constructor() {
        super();
    }
    state = state: {
            anchorEl: undefined, 
            open: false
        }
    handleMenuClick(event) {
        this.setState({
            open: true, 
            anchorEl: event.currentTarget
        });
    }
    handleMenuRequestClose() {
        this.setState({
            open: false
        });
    }
    render() {
        return  (
                <div>
                    <IconButton contrast onClick={this.handleMenuClick} aria-owns="api-menu" aria-haspopup="true">
                        <MoreVertIcon>
                        </MoreVertIcon>
                    
                    </IconButton>
                
                    <Menu id="api-menu" anchorEl={this.state.anchorEl} open={this.state.open} onRequestClose={this.handleMenuRequestClose}>
                    {
                        this.props.components.map((component) => {
                            return  (
                                    <MenuItem key={component} component={Link} to={`/component-api/${kebabCase(component)}`} button={false} onClick={this.handleMenuRequestClose}>
                                    {component}</MenuItem>
                                )
                            ;
                        })
                    }</Menu>
                
                </div>
            )
        ;
    }
}
ApiMenuComponents.propTypes = {
    components: PropTypes.array.isRequired
};
export default ApiMenuComponents;
