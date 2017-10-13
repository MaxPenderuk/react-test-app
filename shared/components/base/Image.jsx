import React, { Component } from 'react';
import PropTypes            from 'prop-types';

import './Image.css';

export default class Image extends Component {
    static propTypes = {
        src:      PropTypes.string.isRequired,
        onDelete: PropTypes.func
    }

    handleDeleteClick = () => {
        this.props.onDelete();
    }

    render() {
        const { src } = this.props;

        return (
            <div className='Image'>
                <div className='Image__delete' onClick={this.handleDeleteClick} />
                <img src={src} />
            </div>
        );
    }
}
