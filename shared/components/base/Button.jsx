import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import './Button.css';

export default class Button extends Component {
    static propTypes = {
        onClick   : PropTypes.func,
        text      : PropTypes.string.isRequired,
        disabled  : PropTypes.bool,
        type      : PropTypes.string
    };

    static contextTypes = {
        router : PropTypes.object
    };

    handleClick = e => {
        if (this.props.onClick) {
            this.props.onClick(e);
        }
    };

    render() {
        const { text, type } = this.props;
        const btnTypes = {
            default : 'default',
            big     : 'bg',
            custom  : 'custom'
        };

        return (
            <button
                className={`Button ${type ? `Button--${btnTypes[type]}` : ''}`}
                onClick={this.handleClick}
            >
                {text}
            </button>
        );
    }
}
