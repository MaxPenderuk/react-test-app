import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import SignupAddressForm from '../forms/SignupAddressForm.jsx';

export default class SignupAddress extends Component {
    static propTypes = {
        dispatch            : PropTypes.func.isRequired,
        userInfo            : PropTypes.object.isRequired,
        userCountriesList   : PropTypes.array.isRequired,
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

        this.context.router.push('/signup-birthday');
    }

    render() {
        return (
            <SignupAddressForm
                onSubmit={this.handleSubmitClick}
                userInfo={this.props.userInfo}
                userCountriesList={this.props.userCountriesList}
            />
        );
    }
}
