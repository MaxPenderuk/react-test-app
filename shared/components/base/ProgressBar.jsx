import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import './ProgressBar.css';

export default class ProgressBar extends Component {
    static propTypes = {
        value       : PropTypes.string,
        isSuccess   : PropTypes.bool
    };

    render() {
        const { value, isSuccess } = this.props;

        return (
            <div className='ProgressBar'>
                <div
                    className={`ProgressBar__line ${isSuccess ? 'ProgressBar__line--success' : ''}`}
                    style={{ width: `${!isSuccess ? value : '100%'}` }}
                >
                    {!isSuccess ? value : 'This is a success alert'}
                </div>
            </div>
        );
    }
}
