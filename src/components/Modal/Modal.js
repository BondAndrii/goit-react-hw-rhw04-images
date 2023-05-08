
import React from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import "./Modal.css";


const modalRoot = document.querySelector('#modal-root');

export default function Modal({forRender, onClose}) {
    
    const { largeImageURL, alt } = forRender;
    useEffect(() => {
        
        const handleKeyDown = e => {
        
            if (e.code === 'Escape') {                
                onClose();
            }
    }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    },[onClose])
    
    const handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    }
    return createPortal(
        <div className="Overlay" onClick={handleBackdropClick}>
            <div className="Modal">
                
                <img src={largeImageURL} alt={alt} />
                
            </div>
        </div>,
        modalRoot
    );

}


Modal.propTypes = {
    forRender: PropTypes.object,
    onClose: PropTypes.func,
}