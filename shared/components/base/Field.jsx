import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import './Field.css';

export default class Field extends Component {
    static propTypes = {
        className           : PropTypes.string,
        type                : PropTypes.string,
        value               : PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        disabled            : PropTypes.bool,
        placeholder         : PropTypes.string,
        onChange            : PropTypes.func,
        errorCode           : PropTypes.string
    };

    handleInputChange = e => {
        const input = e.target;

        this.props.onChange(input.value);
    }

    render() {
        const {
            className,
            type,
            value,
            disabled,
            errorCode,
            placeholder
        } = this.props;
        const errors = {
            REQUIRED: 'Required!',
            WRONG_EMAIL: 'Invalid email',
            WRONG_PASSWORD: 'Invalid password',
            MISMATCH_PASSWORD: 'Entered passwords do not match',
            TOO_LONG: 'Too long',
            TOO_SHORT: 'Too short',
            FIELDS_NOT_EQUAL: 'Fields are not equal'
        };
        const errorText = errorCode && errors[errorCode] ? errors[errorCode] : '';

        return (
            <div className={`Field ${errorCode ? 'Field--error' : ''}`}>
                <input
                    className={`Field__input ${className || ''}`}
                    type={type}
                    value={value || ''}
                    disabled={disabled}
                    onChange={this.handleInputChange}
                    placeholder={placeholder}
                />
                <div className={'Field__error-text'}>{errorText}</div>
            </div>
        );
    }
}
