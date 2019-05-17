/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-studio\src\ittf\webpacks\ittfeditor\ittf\webpacks\ittfeditor\src\components\muidocs\apimenucomponents.js.ittf
    utc time: Thu, 24 May 2018 09:14:50 GMT
*/
'use strict';
var verify = require('wizzi-utils-webpack').verify;
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { Link } from 'react-router';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import { kebabCase } from '../../utils/helpers';
const styleSheet = createStyleSheet('ApiMenuComponents', theme => (
    {}));

class ApiMenuComponents extends React.Component  {
    state = {
        anchorEl: undefined, 
        open: false
    };
    handleMenuClick = (event) => {
        this.setState({
            open: true, 
            anchorEl: event.currentTarget
        });
    }
    handleMenuRequestClose = () => {
        this.setState({
            open: false
        });
    }
    render() {
        return  (
                <div>
                    <IconButton onClick={this.handleMenuClick} aria-owns="api-menu" aria-haspopup="true">
                        <MoreVertIcon>
                        </MoreVertIcon>
                    
                    </IconButton>
                
                    <Menu id="api-menu" anchorEl={this.state.anchorEl} open={this.state.open} onRequestClose={this.handleMenuRequestClose}>
                    {
                        this.props.components.map((component) => {
                            return  (
                                    <MenuItem key={component} component={Link} to={`/component-api/${kebabCase(component)}`} button={false} onClick={this.handleMenuRequestClose}>
                                    {component}
                                    </MenuItem>
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
}

const ApiMenuComponentsStyled = withStyles(styleSheet)(ApiMenuComponents)
;
export default ApiMenuComponentsStyled;
/**
  params
    string code
      # the error name or number
    string method
    string message
      # optional
    { innerError
      # optional
*/
function error(code, method, message, innerError) {
    var parameter = null;
    if (verify.isObject(message)) {
        parameter = message.parameter;
        message = message.message;
    }
    return verify.error(innerError, {
        name: ( verify.isNumber(code) ? 'Err-' + code : code ),
        method: '.' + method,
        parameter: parameter,
        sourcePath: __filename
    }, message || 'Error message unavailable');
}
