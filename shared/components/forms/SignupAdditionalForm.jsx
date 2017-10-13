import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import DatePicker           from 'react-datepicker';
import moment               from 'moment';

import Container    from '../base/Container.jsx';
import Field        from '../../components/base/Field.jsx';
import Heading      from '../../components/base/Heading.jsx';
import Button       from '../../components/base/Button.jsx';

import './SignupAdditionalForm.css';

import 'react-datepicker/dist/react-datepicker.css';

export default class SignupAdditionalForm extends Component {
    static propTypes = {
        userInfo: PropTypes.object.isRequired,
        onSubmit: PropTypes.func.isRequired
    };

    static contextTypes = {
        router : PropTypes.object
    }

    state = {
        field1       : '',
        field2       : '',
        date         : moment()
    }

    componentWillMount() {
        const { userInfo } = this.props;
        const state = { ...this.state };

        if (userInfo.field1) {
            state.field1 = userInfo.field1;
        }
        if (userInfo.field2) {
            state.field2 = userInfo.field2;
        }
        if (userInfo.date) {
            state.date = userInfo.date;
        }

        this.setState(state);
    }

    handleFieldChange = (field, value) => {
        const state = { ...this.state };

        state[field] = value;

        this.setState(state);
    }

    handleDatePick = date => {
        this.setState({ date });
    }

    handleSubmitClick = () => {
        const {
            field1,
            field2,
            date
        } = this.state;
        const additionalDate = moment(date);

        this.props.onSubmit({
            field1,
            field2,
            date: additionalDate.format('L')
        });
    }

    render() {
        const { userInfo } = this.props;

        return (
            <Container>
                <div className='SignupAdditionalForm'>
                    <Heading text='Fichereischein' textAlign='center' />
                    <Field
                        onChange={this.handleFieldChange.bind(null, 'field1')}
                        type='text'
                        value={this.state.field1 || userInfo.field1}
                        placeholder='Fichereischein-Nr'
                    />
                    <Field
                        onChange={this.handleFieldChange.bind(null, 'field2')}
                        type='text'
                        value={this.state.field2 || userInfo.field2}
                        placeholder='Ausstellende Behörde'
                    />
                    <Heading text='Gultig bis:' textAlign='center' />
                    <DatePicker
                        inline
                        selected={this.state.date}
                        onChange={this.handleDatePick}
                    />
                    <Button text='REGISTRIEREN' onClick={this.handleSubmitClick} />
                </div>
            </Container>
        );
    }
}
