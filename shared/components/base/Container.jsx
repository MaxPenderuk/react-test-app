import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import './Container.css';

export default class Container extends Component {
    static propTypes = {
        children: PropTypes.node
    };

    render() {
        return (
            <div className='Container'>
                {this.props.children}
            </div>
        );
    }
}
