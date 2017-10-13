import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Container    from '../base/Container.jsx';
import Button       from '../base/Button.jsx';
import Heading      from '../base/Heading.jsx';

import './SignupFinal.css';

export default class SignupFinal extends Component {
    static propTypes = {
        userInfo: PropTypes.object.isRequired
    };

    static contextTypes = {
        router : PropTypes.object
    }

    handleSubmitClick = () => {
        console.log(this.props.userInfo);
    }

    render() {
        return (
            <Container>
                <div className='SignupFinal'>
                    <Heading text='Fischereischein Deutschland' textAlign='center' />
                    <div className='SignupFinal__text'>
                        <h4>{'Gut gemacht!'}</h4>
                        <h4>{'Dein Schein wird jetzt von unseren Administratoren geprüft!'}</h4>
                        <h4>{'Du bekommst eine E-Mail sobald du eine Angelkarte kaufen kannst.'}</h4>
                    </div>
                    <Button text='Weiter zur Übersicht' onClick={this.handleSubmitClick} />
                </div>
            </Container>
        );
    }
}
