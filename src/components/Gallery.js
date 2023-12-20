import React, { useState } from 'react';
import PhotoUploader from './PhotoUploader';
import PhotoGallery from './PhotoGallery';
import './Gallery.css';

function Gallery() {
    const [photos, setPhotos] = useState([]);

    const handlePhotoUpload = (newPhoto) => {
        setPhotos([...photos, newPhoto]);
    };

    const handleDeletePhoto = (newPhotos) => {
        setPhotos(newPhotos);
    };

    return (
        <div className="gallery-container">
            <h2>Фотогалерея погоды</h2>
            <PhotoUploader onUpload={handlePhotoUpload} />
            <PhotoGallery photos={photos} onDeletePhoto={handleDeletePhoto} />
        </div>
    );
}

export default Gallery;