import React from "react";
import PropTypes from 'prop-types';
import './ImageGalleryItem.css'

const ImageGalleryItem = (props) =>   
    (<li className="ImageGalleryItem">
    <img
        className="ImageGalleryItem-image"        
        id={props.item.id}
        src={props.item.previewURL}
        alt={props.item.tags}
        onClick={() => props.onClick(props.item)}
    />
    </li>);
    


export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
}

 