import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import Select               from 'react-select';
import find                 from 'lodash/find';

import Container    from '../base/Container.jsx';
import Field        from '../../components/base/Field.jsx';
import Heading      from '../../components/base/Heading.jsx';
import Button       from '../../components/base/Button.jsx';
import ProgressBar  from '../../components/base/ProgressBar.jsx';

import 'react-select/dist/react-select.css';

import './SignupAddressForm.css';

export default class SignupAddressForm extends Component {
    static propTypes = {
        userInfo            : PropTypes.object.isRequired,
        onSubmit            : PropTypes.func.isRequired,
        userCountriesList   : PropTypes.array.isRequired
    };

    static contextTypes = {
        router : PropTypes.object
    }

    state = {
        street      : '',
        postCode    : '',
        city        : '',
        country     : null
    }

    componentWillMount() {
        const {
            userInfo,
            userCountriesList
        } = this.props;
        const state = { ...this.state };

        if (userInfo.street) {
            state.street = userInfo.street;
        }
        if (userInfo.postCode) {
            state.postCode = userInfo.postCode;
        }
        if (userInfo.city) {
            state.city = userInfo.city;
        }
        if (userInfo.country) {
            state.country = userInfo.country;
        }

        state.country = userInfo.country || find(userCountriesList, val => val.code === userInfo.countryCode);

        this.setState(state);
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
            street,
            postCode,
            city,
            country
        } = this.state;

        this.props.onSubmit({
            street,
            postCode,
            city,
            country: country.value
        });
    }

    handleSelectChange = value => {
        this.setState({
            country: value
        });
    }

    render() {
        const {
            userInfo,
            userCountriesList
        } = this.props;

        return (
            <Container>
                <div className='SignupAddressForm'>
                    <ProgressBar value='80%' />
                    <Heading text='Wie heißt du?' textAlign='center' />
                    <Field
                        onChange={this.handleFieldChange.bind(null, 'street')}
                        type='text'
                        value={this.state.street || userInfo.street}
                        placeholder='Straße'
                    />
                    <Field
                        onChange={this.handleFieldChange.bind(null, 'postCode')}
                        type='text'
                        value={this.state.postCode || userInfo.postCode}
                        placeholder='PLZ'
                    />
                    <Field
                        onChange={this.handleFieldChange.bind(null, 'city')}
                        type='text'
                        value={this.state.city || userInfo.city}
                        placeholder='ORT'
                    />
                    <Select
                        value={this.state.country}
                        options={userCountriesList}
                        onChange={this.handleSelectChange}
                        noResultsText={'No results found'}
                        placeholder='Land'
                    />
                    <Button text='Weiter' onClick={this.handleSubmitClick} />
                </div>
            </Container>
        );
    }
}
