import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import LIVR                 from 'livr';

import Container    from '../base/Container.jsx';
import Field        from '../../components/base/Field.jsx';
import Heading      from '../../components/base/Heading.jsx';
import Button       from '../../components/base/Button.jsx';
import ProgressBar  from '../../components/base/ProgressBar.jsx';

import './SignupNameForm.css';

export default class SignupNameForm extends Component {
    static propTypes = {
        userInfo: PropTypes.object.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    static contextTypes = {
        router : PropTypes.object
    }

    state = {
        firstName   : '',
        lastName    : '',
        errors      : {}
    }

    componentWillMount() {
        const { userInfo } = this.props;

        if (userInfo.firstName && userInfo.lastName) {
            this.setState({
                firstName   : userInfo.firstName,
                lastName    : userInfo.lastName
            });
        }
    }

    handleFieldChange = (field, value) => {
        const state = { ...this.state };

        if (state.errors && state.errors[field]) {
            delete state.errors[field];
        }

        state[field] = value;

        if (state[field].length > 1) {
            const val = state[field];

            state[field] = val.charAt(0).toUpperCase() + val.slice(1);
        }

        this.setState(state);
    }

    handleSubmitClick = () => {
        const {
            firstName,
            lastName
        } = this.state;
        const validatedResult = this.validate({ firstName, lastName });

        if (validatedResult) {
            this.props.onSubmit({ firstName, lastName });
        }
    }

    validate(data) {
        const rules = {
            firstName   : ['required', { 'min_length': 3 } ],
            lastName    : ['required', { 'min_length': 3 } ]
        };
        const validator = new LIVR.Validator(rules);
        const validateResult = validator.validate(data);

        if (!validateResult) {
            this.setState({ errors: validator.getErrors() });
        }

        return validateResult;
    }

    render() {
        const { errors } = this.state;
        const { userInfo } = this.props;

        return (
            <Container>
                <div className='SignupNameForm'>
                    <ProgressBar value='60%' />
                    <Heading text='Wie heißt du?' textAlign='center' />
                    <Field
                        onChange={this.handleFieldChange.bind(null, 'firstName')}
                        type='text'
                        value={this.state.firstName || userInfo.firstName}
                        placeholder='Vorname'
                        errorCode={errors.firstName}
                    />
                    <Field
                        onChange={this.handleFieldChange.bind(null, 'lastName')}
                        type='text'
                        value={this.state.lastName || userInfo.lastName}
                        placeholder='Nachname'
                        errorCode={errors.lastName}
                    />
                    <Button text='Weiter' onClick={this.handleSubmitClick} />
                </div>
            </Container>
        );
    }
}
