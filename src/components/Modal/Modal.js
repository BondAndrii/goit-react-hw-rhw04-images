
import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import "./Modal.css";


const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
    state = {
        largeImage: '',
        alt: '',        
    }
    
    componentDidMount() {
        const { largeImageURL, tags } = this.props.forRender;
        this.setState({
            largeImage: largeImageURL,
            alt: tags,
        });
        window.addEventListener('keydown', this.handleKeyDown)
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown)
        
    }
    handleKeyDown = e => {
            if (e.code === 'Escape') {
                console.log(e.code);
                this.props.onClose();
            }
    }
    handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    }
    render() {
        const { largeImage, tags } = this.state;
        return createPortal(
            <div className="Overlay" onClick={this.handleBackdropClick}>
                <div className="Modal"> 
                    {/* {this.props.children} */}                    
                    <img src={largeImage} alt={tags} />
                    {/* <button type="button" onClick={this.props.onClose}>жми</button> */}
                </div>
            </div>, 
            modalRoot
        )
    };
}


export default Modal;

Modal.propTypes = {
    forRender: PropTypes.object,
    onClose: PropTypes.func,
}