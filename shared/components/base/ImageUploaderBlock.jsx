import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import './ImageUploaderBlock.css';

export default class ImageUploaderBlock extends Component {
    static propTypes = {
        onChange: PropTypes.func.isRequired,
        onClick : PropTypes.func,
        type    : PropTypes.string,
        text    : PropTypes.string
    };

    handleFileChange = async e => {
        const input = e.target;
        const images = [];
        const promises = [];

        if (!input.files) {
            return;
        }

        Array.from(input.files).forEach(file => {
            promises.push(new Promise((resolve) => {
                const reader = new FileReader();

                reader.onload = event => {
                    images.push({
                        base64: event.target.result,
                        file
                    });
                    resolve();
                };
                reader.readAsDataURL(file);
            }));
        });

        await Promise.all(promises);

        this.props.onChange(images[0]);
    };

    render() {
        return (
            <div className='ImageUploaderBlock'>
                <label className='ImageUploaderBlock__label' onClick={this.props.onClick}>
                    <span>{ this.props.text }</span>
                    <input
                        type='file'
                        style={{ display: 'none' }}
                        onChange={this.handleFileChange}
                    />
                </label>
            </div>
        );
    }
}

