import React, { useState } from 'react';

function PhotoUploader({ onUpload }) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (selectedFile) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const imageData = e.target.result;
                onUpload(imageData);
            };
            fileReader.readAsDataURL(selectedFile);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Загрузить фото</button>
        </div>
    );
}

export default PhotoUploader;