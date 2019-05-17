/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\approuter.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { withPageInfo } from '../utils/withPageInfo';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MyLink from './mui/AppDrawerNavItem';
import Home from './routes/Home';
import About from './routes/About';
import Topics from './routes/Topics';
import CodeHighLightDemo from './routes/CodeHighLightDemo';
// import CodePrettierDemo from './routes/CodePrettierDemo'
import CodeBeautifyDemo from './routes/CodeBeautifyDemo';
import CodeEditorDemo from './routes/CodeEditorDemo';
import CodeEditSplit2 from './routes/CodeEditSplit2';
import TreeViewDemo from './routes/TreeViewDemo';
import FolderCodeEditor from './routes/FolderCodeEditor';
import FormDialog from './routes/FormDialog';
import Menus from './routes/Menus';
import GridDemo from './routes/GridDemo';
import NotifierDemo from './routes/NotifierDemo';
import WizziProjects from './routes/WizziProjects';
import WizziSchemaView from './routes/WizziSchemaView';
import WizziProjectStudio from './routes/WizziProjectStudio';
import WizziPackages from './routes/WizziPackages';
import WizziKernelPackage from './routes/WizziKernelPackage';
import WizziPluginPackage from './routes/WizziPluginPackage';
import WizziSchemaEditor from './routes/WizziSchemaEditor';
import WizziArtifactEditor from './routes/WizziArtifactEditor';
import WizziRepo from './routes/WizziRepo';
import WizziJobs from './routes/WizziJobs';
import WizziJob from './routes/WizziJob';
import WizziGists from './routes/WizziGists';
import WizziGist from './routes/WizziGist';
import WizziSnippets from './routes/WizziSnippets';
import WizziSnippet from './routes/WizziSnippet';
import WizziSystem from './routes/WizziSystem';
const drawerWidth = 240;
const styles = theme => (
    {
        root: {
            flexGrow: 1, 
            height: '100%'
        }, 
        appFrame: {
            height: 'calc(100% - 64px)', 
            zIndex: 1, 
            overflow: 'hidden', 
            position: 'relative', 
            display: 'flex', 
            width: '100%'
        }, 
        appBar: {
            position: 'absolute', 
            transition: theme.transitions.create([
                'margin', 
                'width'
            ], {
                easing: theme.transitions.easing.sharp, 
                duration: theme.transitions.duration.leavingScreen
            })
        }, 
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`
            , 
            transition: theme.transitions.create([
                'margin', 
                'width'
            ], {
                easing: theme.transitions.easing.easeOut, 
                duration: theme.transitions.duration.enteringScreen
            })
        }, 
        'appBarShift-left': {
            marginLeft: drawerWidth
        }, 
        menuButton: {
            marginLeft: 12, 
            marginRight: 20
        }, 
        hide: {
            display: 'none'
        }, 
        drawerPaper: {
            position: 'relative', 
            width: drawerWidth
        }, 
        drawerHeader: {
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'flex-end', 
            padding: '0 8px', 
            ...theme.mixins.toolbar
        }, 
        content: {
            flexGrow: 1, 
            backgroundColor: theme.palette.background.default, 
            padding: theme.spacing.unit * 3, 
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp, 
                duration: theme.transitions.duration.leavingScreen
            })
        }, 
        'content-left': {
            marginLeft: -drawerWidth
        }, 
        contentShift: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut, 
                duration: theme.transitions.duration.enteringScreen
            })
        }, 
        'contentShift-left': {
            marginLeft: 0
        }, 
        contentRoutes: {
            flexGrow: 1, 
            backgroundColor: theme.palette.background.default, 
            padding: theme.spacing.unit * 3, 
            width: '100%'
        }
    });

class AppRouter extends React.Component {
    state = {
        open: false
    };
    handleDrawerOpen = () => {
        this.setState({
            open: true
        });
    }
    handleDrawerClose = () => {
        this.setState({
            open: false
        });
    }
    render() {
        const {
            classes,
            pageInfo
        } = this.props;
        const {open} = this.state;
        const drawer =  (
            <Drawer variant="persistent" anchor="left" open={open} classes={{
                paper: classes.drawerPaper
            }}>
                <div className={classes.drawerHeader}>
                    <MyLink className={classes.title} to="/" title="Wizzi">
                    </MyLink>
                
                    <IconButton onClick={this.handleDrawerClose}>
                        <ChevronLeftIcon>
                        </ChevronLeftIcon>
                    
                    </IconButton>
                
                </div>
            
                <Divider>
                </Divider>
            
                <List>
                    <MyLink to="/" title="Home">
                    </MyLink>
                
                    <MyLink to="/about" title="About">
                    </MyLink>
                
                    <MyLink to="/topics" title="Topics">
                    </MyLink>
                
                    <MyLink to="/codehighlight" title="Code highlight">
                    </MyLink>
                
                    <MyLink to="/codeprettier" title="Code prettier">
                    </MyLink>
                
                    <MyLink to="/codebeautify" title="Code beautify">
                    </MyLink>
                
                    <MyLink to="/codeeditor" title="Code editor">
                    </MyLink>
                
                    <MyLink to="/codeeditsplit2" title="Code edit split 2">
                    </MyLink>
                
                    <MyLink to="/treeview" title="Tree view">
                    </MyLink>
                
                    <MyLink to="/foldereditor" title="Folder editor view">
                    </MyLink>
                
                    <MyLink to="/formdialog" title="Form dialog">
                    </MyLink>
                
                    <MyLink to="/menus" title="Menus">
                    </MyLink>
                
                    <MyLink to="/grid" title="GridDemo">
                    </MyLink>
                
                    <MyLink to="/notifier" title="NotifierDemo">
                    </MyLink>
                
                    <MyLink to="/wizziprojects" title="Wizzi projects">
                    </MyLink>
                
                    <MyLink to="/wizzipackages" title="Wizzi packages">
                    </MyLink>
                
                    <MyLink to="/wizzirepo/stefi" title="Wizzi repo">
                    </MyLink>
                
                    <MyLink to="/wizzijobs/stefi" title="Wizzi jobs">
                    </MyLink>
                
                    <MyLink to="/job/gists/stefi" title="Wizzi gists">
                    </MyLink>
                
                    <MyLink to="/job/snippets/stefi" title="Wizzi snippets">
                    </MyLink>
                
                    <MyLink to="/wizzi/system" title="Wizzi system">
                    </MyLink>
                
                </List>
            
            </Drawer>
        )
        ;
        return  (
                <Router>
                    <div className={classes.appFrame}>
                        <AppBar className={classNames(classes.appBar, {
                            [classes.appBarShift]: open, 
                            [classes['appBarShift-left']]: open
                        })}>
                            <Toolbar disableGutters={!open}>
                                <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerOpen} className={classNames(classes.menuButton, open && classes.hide)}>
                                    <MenuIcon>
                                    </MenuIcon>
                                
                                </IconButton>
                            
                                <Typography variant="title" color="inherit" noWrap>
                                {pageInfo.title}</Typography>
                            
                            </Toolbar>
                        
                        </AppBar>
                    
                    {drawer}<main className={classNames(classes.content, classes['content-left'], {
                            [classes.contentShift]: open, 
                            [classes['contentShift-left']]: open
                        })}>
                            <div className={classes.drawerHeader}>
                            </div>
                        
                            <div className={classes.contentRoutes}>
                                <Route exact path="/" component={Home}>
                                </Route>
                            
                                <Route path="/about" component={About}>
                                </Route>
                            
                                <Route path="/topics" component={Topics}>
                                </Route>
                            
                                <Route path="/codehighlight" component={CodeHighLightDemo}>
                                </Route>
                            
                                <Route path="/codebeautify" component={CodeBeautifyDemo}>
                                </Route>
                            
                                <Route path="/codeeditor" component={CodeEditorDemo}>
                                </Route>
                            
                                <Route path="/codeeditsplit2" component={CodeEditSplit2}>
                                </Route>
                            
                                <Route path="/treeview" component={TreeViewDemo}>
                                </Route>
                            
                                <Route path="/foldereditor" component={FolderCodeEditor}>
                                </Route>
                            
                                <Route path="/formdialog" component={FormDialog}>
                                </Route>
                            
                                <Route path="/menus" component={Menus}>
                                </Route>
                            
                                <Route path="/grid" component={GridDemo}>
                                </Route>
                            
                                <Route path="/notifier" component={NotifierDemo}>
                                </Route>
                            
                                <Route path="/wizziprojects" component={WizziProjects}>
                                </Route>
                            
                                <Route path="/wizzischema/:schemaUri" component={WizziSchemaView}>
                                </Route>
                            
                                <Route path="/wizziprojectstudio/:projectId" component={WizziProjectStudio}>
                                </Route>
                            
                                <Route path="/wizzipackages" component={WizziPackages}>
                                </Route>
                            
                                <Route path="/wizzikernelpackage/:packageName" component={WizziKernelPackage}>
                                </Route>
                            
                                <Route path="/wizzi/ittf/:version/kernel/:packageName" component={WizziKernelPackage}>
                                </Route>
                            
                                <Route path="/wizzipluginpackage/:packageName" component={WizziPluginPackage}>
                                </Route>
                            
                                <Route path="/wizzi/ittf/:version/plugin/:packageName" component={WizziPluginPackage}>
                                </Route>
                            
                                <Route path="/wizzischemaeditor/:schemaId" component={WizziSchemaEditor}>
                                </Route>
                            
                                <Route path="/wizziartifacteditor/:artifactId" component={WizziArtifactEditor}>
                                </Route>
                            
                                <Route path="/wizzirepo/:userId" component={WizziRepo}>
                                </Route>
                            
                                <Route path="/wizzijobs/:userId" component={WizziJobs}>
                                </Route>
                            
                                <Route path="/wizzijob/:userId/:hash" component={WizziJob}>
                                </Route>
                            
                                <Route path="/wizzi/jobs/:version/:packageKind/:packageName" component={WizziJob}>
                                </Route>
                            
                                <Route path="/job/gists/:userId" component={WizziGists}>
                                </Route>
                            
                                <Route path="/job/gist/:userId/:hash" component={WizziGist}>
                                </Route>
                            
                                <Route path="/job/snippets/:userId" component={WizziSnippets}>
                                </Route>
                            
                                <Route path="/job/snippet/:userId/:hash" component={WizziSnippet}>
                                </Route>
                            
                                <Route path="/wizzi/system" component={WizziSystem}>
                                </Route>
                            
                            </div>
                        
                        </main>
                    
                    </div>
                
                </Router>
            )
        ;
    }
}
const AppRouterContexted = withPageInfo(AppRouter);
export default withStyles(styles)(AppRouterContexted)
;
