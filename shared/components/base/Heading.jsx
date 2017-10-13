import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import './Heading.css';

export default class Heading extends Component {
    static propTypes = {
        text        : PropTypes.string,
        textAlign   : PropTypes.string
    };

    render() {
        const { textAlign } = this.props;

        return (
            <div className={`Heading ${textAlign ? `Heading--${textAlign}` : ''}`}>
                <h2>{this.props.text}</h2>
            </div>
        );
    }
}
