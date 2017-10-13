import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import SignupNameForm from '../forms/SignupNameForm.jsx';

export default class SignupName extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        userInfo: PropTypes.object.isRequired,
        actions : PropTypes.object.isRequired
    };

    static contextTypes = {
        router : PropTypes.object
    }

    handleSubmitClick = data => {
        const {
            dispatch,
            actions
        } = this.props;

        if (data) {
            dispatch(actions.setCredentials(data));
        }

        this.context.router.push('/signup-address');
    }

    render() {
        return (
            <SignupNameForm
                onSubmit={this.handleSubmitClick}
                userInfo={this.props.userInfo}
            />
        );
    }
}
