import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import DatePicker           from 'react-datepicker';
import moment from 'moment';

import Container    from '../base/Container.jsx';
import Button       from '../base/Button.jsx';
import ProgressBar  from '../base/ProgressBar.jsx';
import Heading      from '../base/Heading.jsx';

import './SignupBirthday.css';

import 'react-datepicker/dist/react-datepicker.css';

export default class SignupSuccess extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        userInfo: PropTypes.object.isRequired,
        actions : PropTypes.object.isRequired
    };

    static contextTypes = {
        router : PropTypes.object
    }

    state = {
        birthdayDate: moment()
    }

    componentWillMount() {
        const { userInfo } = this.props;

        if (userInfo.birthdayDate) {
            this.setState({
                birthdayDate: moment(userInfo.birthdayDate)
            });
        }
    }

    handleSubmitClick = async () => {
        const date = { ...this.state.birthdayDate };
        const birthdayDate = moment(date);

        const data = {
            birthdayDate: birthdayDate.format('L')
        };

        await this.props.dispatch(this.props.actions.setCredentials(data));

        this.context.router.push('/signup-complete');
    }

    handleBackClick = () => {
        this.context.router.push('/');
    }

    handleDatePick = birthdayDate => {
        this.setState({ birthdayDate });
    }

    render() {
        return (
            <Container>
                <div className='SignupBirthday'>
                    <ProgressBar value='90%' />
                    <Heading text='Geburtstag' textAlign='center' />
                    <DatePicker
                        inline
                        selected={this.state.birthdayDate}
                        onChange={this.handleDatePick}
                    />
                    <Button text='Weiter' onClick={this.handleSubmitClick} />
                </div>
            </Container>
        );
    }
}
