/*
    artifact generator: /wizzi/lib/artifacts/js/module/gen/main.js
    primary source IttfDocument: c:\my\wizzi\v3\next\sources\webpacks\cssstyle\ittf\webpacks\cssstyle\src\components\panels.js.ittf
    utc time: Wed, 19 Jul 2017 08:08:01 GMT
*/
'use strict';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Prefixer from 'inline-style-prefixer';
import stylePropType from 'react-style-proptype';
var USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Safari/537.2';
var USER_AGENT = 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.2 (KHTML, like Gecko) Safari/537.2';
class Pane extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: this.props.size
        };
    }
    
    render() {
        var {children, className, prefixer, split, style: styleProps} = this.props;
        var {size} = this.state;
        var classes = [
            'Pane', 
            split, 
            className
        ];
        var style = Object.assign({}, (styleProps || {}), {
            flex: 1, 
            position: 'relative', 
            outline: 'none'
        })
        ;
        if (size !== undefined) {
            if (split === 'vertical') {
                style.width = size;
            }
            else {
                style.height = size;
                style.display = 'flex';
            }
            style.flex = 'none';
        }
        return  (
                <div className={classes.join(' ')} style={prefixer.prefix(style)}>
                {children}
                </div>
            )
        ;
    }
}
Pane.propTypes = {
    className: PropTypes.string.isRequired, 
    children: PropTypes.node.isRequired, 
    prefixer: PropTypes.instanceOf(Prefixer).isRequired
    , 
    size: PropTypes.oneOfType([
        PropTypes.string, 
        PropTypes.number
    ])
    , 
    split: PropTypes.oneOf([
        'vertical', 
        'horizontal'
    ])
    , 
    style: stylePropType
};
Pane.defaultProps = {
    prefixer: new Prefixer({
        userAgent: USER_AGENT
    })
};
class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabActive: props.tabActive
        };
    }
    
    componentDidMount() {
        var index = this.state.tabActive;
        var $selectedPanel = this.refs['tab-panel'];
        var $selectedTabMenu = this.refs['tab-menu-' + index];
        if (this.props.onMount) {
            this.props.onMount(index, $selectedPanel, $selectedTabMenu);
        }
    }
    componentWillReceiveProps(newProps) {
        if (newProps.tabActive && newProps.tabActive !== this.props.tabActive) {
            this.setState({
                tabActive: newProps.tabActive
            });
        }
    }
    setActive(index,e) {
        e.preventDefault();
        var onAfterChange = this.props.onAfterChange;
        var onBeforeChange = this.props.onBeforeChange;
        var $selectedPanel = this.refs['tab-panel'];
        var $selectedTabMenu = this.refs['tab-menu-' + index'];
        if (onBeforeChange) {
            var cancel = onBeforeChange(index, $selectedPanel, $selectedTabMenu);
            if (cancel === false) {
                return ;
            }
            this.setState({
                tabActive: index
            }, () => {
                if (onAfterChange) {
                    onAfterChange(index, $selectedPanel, $selectedTabMenu);
                }
            });
        }
    }
    _getMenuItems() {
        if (!this.props.children) {
            throw new Error('Tabs must contain at least one TabPanel;
        }
        if (!Array.isArray(this.props.children)) {
            this.props.children = [this.props.children];
        }
        var $menuItems = this.props.children.map(($panel) => {
            return typeof $panel === 'function' ? $panel() : $panel;
        }).filter.map
        ;
        return  (
                <nav className="tabs-navigation">
                 (
                    <ul className="tabs-menu">
                    {$menuItems}
                    </ul>
                )
                </nav>
            )
        ;
    }
    _getSelectedPanel() {
        var index = this.state.tabActive - 1;
        var $panel = this.props.children[index];
        return  (
                <article className="tab-panel" ref="tab-panel">
                @ref tab-panel
                {$panel}
                </article>
            )
        ;
    }
    render() {
        var className = classNames('tabs', this.props.className);
        return  (
                <div className={className}>
                {this._getMenuItems()}
                {this._getSelectedPanel()}
                </div>
            )
        ;
    }
    get_div_Style() {
        return {
                float: 'left', 
                marginRight: 20
            };
    }
}
Tabs.propTypes = {
    tabActive: React.PropTypes.number, 
    onMount: React.PropTypes.func, 
    onBeforeChange: React.PropTypes.func, 
    onAfterChange: React.PropTypes.func, 
    children: React.PropTypes.oneOfType([
        React.PropTypes.array, 
        React.PropTypes.element
    ]).isRequired
    
};
Tabs.defaultProps = {
    tabActive: 1
};
class TabItem extends Component {
    constructor() {
        super();
    }
    
    render() {
        const { index, title, isActive, onClick } = this.props;
        return return  (
                    <li ref={ 'tab-menu-' + index } key={index} style={this.get_li_Style(isActive)}>
                        <a style={this.get_a_Style(isActive)} onClick={() => {
                            onClick(index);
                        }}>
                        {title}
                        </a>
                    
                    </li>
                )
            ;
        ;
    }
    get_li_Style(selected) {
        return {
                float: 'left', 
                marginRight: 20
            };
    }
    get_a_Style(isActive) {
        // TODO !isActive :hover == isActive
        return {
                cursor: 'pointer', 
                display: 'block', 
                color: ( isActive ? '#3498DB' : '#A9A9A9' )
            };
    }
}
TabItem.propTypes = {
    index: React.PropTypes.number.isRequired, 
    title: React.PropTypes.string.isRequired, 
    onClick: React.PropTypes.func.isRequired
};
class TabPanel extends Component {
    constructor() {
        super();
    }
    
    render() {
        return  (
                <div>
                {this.props.children}
                </div>
            )
        ;
    }
}
TabPanel.propTypes = {};

module.exports = {
    Pane: Pane,
    Tabs: Tabs,
    TabItem: TabItem,
    TabPanel: TabPanel
};
