import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Container    from '../base/Container.jsx';
import Button       from '../base/Button.jsx';
import Heading      from '../base/Heading.jsx';

import './SignupContinue.css';

export default class SignupContinue extends Component {
    static contextTypes = {
        router : PropTypes.object
    }

    state = {
        hidden: true
    }

    handleSubmitClick = () => {
        this.context.router.push('/signup-image');
    }

    handleShowButtonsClick = () => {
        this.setState({
            hidden: !this.state.hidden
        });
    }

    render() {
        return (
            <Container>
                <div className='SignupContinue'>
                    <Heading text='Wähle deine Berechtigung' textAlign='center' />
                    <Button text='Fischereischein Deutschland' onClick={this.handleSubmitClick} type='custom' />
                    <Button text='Weitere Scheine anzeigen' onClick={this.handleShowButtonsClick} type='default' />
                    {
                        !this.state.hidden
                        ?
                            <div>
                                <Button
                                    text='Fischereischein Deutschland'
                                    onClick={this.handleSubmitClick}
                                    type='custom'
                                />
                                <Button
                                    text='Fischereischein Deutschland'
                                    onClick={this.handleSubmitClick}
                                    type='custom'
                                />
                                <Button
                                    text='Fischereischein Deutschland'
                                    onClick={this.handleSubmitClick}
                                    type='custom'
                                />
                            </div>
                        : ''
                    }
                </div>
            </Container>
        );
    }
}
