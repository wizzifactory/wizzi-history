/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-app\wizzi\ittf\src\components\mui\eventsourceview.js.ittf
    utc time: Sat, 06 Oct 2018 05:59:03 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CodeHighLight from '../mui/CodeHighLight';
const styles = theme => (
    {});

class EventSourceView extends React.Component {
    state = {
        events: []
    };
    sourceClose = () => {
        if (this.source) {
            console.log('EventSource.source', this.source);
            this.source.close();
        }
    }
    sourceOpen = (source, url) => {
        const {
            onEventSourceError
        } = this.props;
        console.log('EventSource.sourceOpen', source, url);
        this.setState({
            events: []
        });
        this.source = source ? source : new EventSource(url);
        this.source.onmessage = (e) => {
            console.log('EventSource.sourceOpen.onmessage', JSON.stringify(e, null, 2));
            if (e.data === "***___CLOSE___***") {
                this.sourceClose();
            }
            else {
                this.setState((prevState) => {
                    let newEvents = prevState.events.concat(e.data);
                    return {
                            events: newEvents
                        };
                });
            }
        };
        this.source.onopen = (e) => {
            console.log('EventSource.opened', e);
        };
        if (onEventSourceError) {
            this.source.onerror = onEventSourceError;
        }
    }
    componentDidMount() {
        const {
            source,
            url
        } = this.props;
        if (source || url) {
            this.sourceOpen(source, url);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const {
            source,
            url
        } = this.props;
        if ((source || url) && (source !== prevProps.source || url !== prevProps.url)) {
            this.sourceOpen(source, url);
        }
    }
    componentWillUnmount() {
        this.sourceClose();
    }
    render() {
        const {
            classes,
            url,
            source
        } = this.props;
        const {events} = this.state;
        if (events.length == 0) {
            if (url || source) {
                return  (
                        <h2>
                        Waiting ...
                        </h2>
                    )
                ;
            }
            else {
                return  (
                        <h2>
                        No running execution
                        </h2>
                    )
                ;
            }
        }
        return  (
                <div>
                    <CodeHighLight codeSnippet={events.join('\n')}>
                    </CodeHighLight>
                
                </div>
            )
        ;
    }
}

EventSourceView.propTypes = {
    url: PropTypes.string,
    source: PropTypes.object,
    onEventSourceError: PropTypes.func
}
export default withStyles(styles)(EventSourceView)
;
