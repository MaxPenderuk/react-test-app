import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Container    from '../base/Container.jsx';
import Button       from '../base/Button.jsx';
import ProgressBar  from '../base/ProgressBar.jsx';

import './SignupSuccess.css';

export default class SignupSuccess extends Component {
    static contextTypes = {
        router : PropTypes.object
    }

    handleSubmitClick = () => {
        const { pathname } = this.context.router.location;

        if (pathname === '/signup-success') {
            this.context.router.push('/signup-name');
        } else {
            this.context.router.push('/signup-continue');
        }
    }

    handleBackClick = () => {
        this.context.router.push('/');
    }

    renderSignupSuccessBlock = () => {
        return (
            <div className='SignupSuccess'>
                <div className='SignupSuccess__icon' />
                <div className='SignupSuccess__text'>
                    <h4>{'Du hast eine E-Mail erhalten.'}</h4>
                    <h4>{'Bitte bestätige diese.'}</h4>
                </div>
                <Button text='Profil ausfüllen' onClick={this.handleSubmitClick} />
                <Button text='Jetzt nicht...' type='default' onClick={this.handleBackClick} />
            </div>
        );
    }

    renderSignupCompleteBlock = () => {
        return (
            <div className='SignupSuccess'>
                <ProgressBar isSuccess={Boolean(true)} />
                <div className='SignupSuccess__text'>
                    <h4>{'Vielen Dank!'}</h4>
                    <h4>{'Dein Profil ist jetzt vollständig!'}</h4>
                </div>
                <Button text='Meinen Fischereischein hochladen' onClick={this.handleSubmitClick} />
                <Button text='Jetzt nicht...' type='default' onClick={this.handleBackClick} />
            </div>
        );
    }

    render() {
        const { pathname } = this.context.router.location;

        return (
            <Container>
                {
                    pathname === '/signup-success'
                    ? this.renderSignupSuccessBlock()
                    : this.renderSignupCompleteBlock()
                }
            </Container>
        );
    }
}
