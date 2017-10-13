import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import Container            from '../base/Container.jsx';
import Button               from '../base/Button.jsx';
import Heading              from '../base/Heading.jsx';
import ImageUploaderBlock   from '../base/ImageUploaderBlock.jsx';
import Image                from '../base/Image.jsx';

import './SignupImage.css';

export default class SignupImage extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        userInfo: PropTypes.object.isRequired,
        actions : PropTypes.object.isRequired
    };

    static contextTypes = {
        router : PropTypes.object
    }

    handleImageAdd = (type, img) => {
        const { dispatch, actions } = this.props;

        dispatch(actions.uploadImage(img.base64, type));
    }

    handleImageDelete = type => {
        const { dispatch, actions } = this.props;

        dispatch(actions.deleteImage(type));
    }

    handleSubmitClick = () => {
        this.context.router.push('/signup-additional');
    }

    render() {
        const { userInfo } = this.props;

        return (
            <Container>
                <div className='SignupImage'>
                    <Heading text='Fischereischein Deutschland' textAlign='center' />
                    {
                        !userInfo.frontSideImg
                        ?
                            <ImageUploaderBlock
                                text='Vorderseite'
                                onChange={this.handleImageAdd.bind(null, 'frontSideImg')}
                                onDelete={this.handleImageDelete.bind(null, 'frontSideImg')}
                            />
                        :
                            <Image
                                src={userInfo.frontSideImg}
                                onDelete={this.handleImageDelete.bind(null, 'frontSideImg')}
                            />
                    }
                    <div className='SignupImage__tip'>{'Wähle zwei Bilder'}</div>
                    {
                        !userInfo.backSideImg
                        ?
                            <ImageUploaderBlock
                                text='Rückseite'
                                onChange={this.handleImageAdd.bind(null, 'backSideImg')}
                            />
                        :
                            <Image
                                src={userInfo.backSideImg}
                                onDelete={this.handleImageDelete.bind(null, 'backSideImg')}
                            />
                    }
                    <div className='SignupImage__tip'>{'Wähle zwei Bilder'}</div>
                    <Button text='Weiter' onClick={this.handleSubmitClick} />
                </div>
            </Container>
        );
    }
}
