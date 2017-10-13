import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import SignupForm from '../forms/SignupForm.jsx';

export default class Signup extends Component {
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

        this.context.router.push('/signup-success');
    }

    render() {
        return (
            <SignupForm
                onSubmit={this.handleSubmitClick}
                userInfo={this.props.userInfo}
            />
        );
    }
}
