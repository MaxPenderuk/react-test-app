import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import 'normalize.css';

if (process.env.BROWSER) {
    require('../assets');
}

export default class App extends Component {
    static propTypes = {
        children : PropTypes.object,
        location: PropTypes.object
    };


    static contextTypes = { router : PropTypes.object }

    componentWillReceiveProps() {
        if (process.env.BROWSER) {
            window.previousLocation = this.props.location;
        }
    }

    handleChange = val => {
        console.log(val);
    }

    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}
