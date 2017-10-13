import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import SignupAdditionalForm from '../forms/SignupAdditionalForm.jsx';

export default class SignupAdditional extends Component {
    static propTypes = {
        dispatch            : PropTypes.func.isRequired,
        userInfo            : PropTypes.object.isRequired,
        actions             : PropTypes.object.isRequired
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

        this.context.router.push('/signup-final');
    }

    render() {
        return (
            <SignupAdditionalForm
                onSubmit={this.handleSubmitClick}
                userInfo={this.props.userInfo}
            />
        );
    }
}
