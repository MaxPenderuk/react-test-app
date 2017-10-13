import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import LIVR                 from 'livr';

import Container    from '../base/Container.jsx';
import Field        from '../../components/base/Field.jsx';
import Heading      from '../../components/base/Heading.jsx';
import Button       from '../../components/base/Button.jsx';

import './SignupForm.css';

export default class Signup extends Component {
    static propTypes = {
        userInfo: PropTypes.object.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    static contextTypes = {
        router : PropTypes.object
    }

    state = {
        email       : '',
        pwd         : '',
        pwdRepeat   : '',
        errors      : {}
    }

    componentWillMount() {
        const { userInfo } = this.props;

        if (userInfo.email && userInfo.pwd) {
            this.setState({
                email       : userInfo.email,
                pwd         : userInfo.pwd,
                pwdRepeat   : userInfo.pwd
            });
        }
    }

    handleFieldChange = (field, value) => {
        const state = { ...this.state };

        if (state.errors && state.errors[field]) {
            delete state.errors[field];
        }

        state[field] = value;

        this.setState(state);
    }

    handleSubmitClick = () => {
        const {
            email,
            pwd,
            pwdRepeat
        } = this.state;
        const validatedResult = this.validate({ email, pwd, pwdRepeat });

        if (validatedResult) {
            this.props.onSubmit({ email, pwd });
        }
    }

    validate(data) {
        const rules = {
            email     : ['required', 'email'],
            pwd       : ['required', { 'min_length': 8 } ],
            pwdRepeat : ['required', { 'min_length': 8 }, { 'equal_to_field': 'pwd' } ]
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
                <div className='SignupForm'>
                    <Heading text='Registriere dich' textAlign='center' />
                    <div className='SignupForm__fields'>
                        <Field
                            onChange={this.handleFieldChange.bind(null, 'email')}
                            type='text'
                            value={this.state.email || userInfo.email}
                            placeholder='EMAIL'
                            errorCode={errors.email}
                        />
                        <Field
                            onChange={this.handleFieldChange.bind(null, 'pwd')}
                            type='password'
                            value={this.state.pwd || userInfo.pwd}
                            placeholder='PASS'
                            errorCode={errors.pwd}
                        />
                        <Field
                            onChange={this.handleFieldChange.bind(null, 'pwdRepeat')}
                            type='password'
                            value={this.state.pwdRepeat || userInfo.pwd}
                            placeholder='PASS'
                            errorCode={errors.pwdRepeat}
                        />
                    </div>
                    <Button text='REGISTRIEREN' onClick={this.handleSubmitClick} />
                </div>
            </Container>
        );
    }
}
