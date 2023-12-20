import React, { useState } from 'react';
import './PhotoGallery.css';

const PhotoItem = ({ photo, index, onDeletePhoto }) => {
    const [comment, setComment] = useState('');
    const [newComment, setNewComment] = useState('');

    const handleDeleteComment = (commentIndex) => {
        setComment((prevComment) => prevComment.split('\n').filter((_, i) => i !== commentIndex).join('\n'));
    };

    const handleSendComment = () => {
        setComment((prevComment) => `${prevComment}${prevComment ? '\n' : ''}Комментарий: ${newComment}`);
        setNewComment('');
    };

    return (
        <div key={index} className="photo-container">
            <img
                src={photo}
                alt={`Фото ${index + 1}`}
                className="photo"
            />
            <div className="comment-container">
                <button onClick={() => onDeletePhoto(index)} className="delete-button">
                    Удалить фотографию
                </button>
                {comment && (
                    <div>
                        {comment.split('\n').map((commentLine, commentIndex) => (
                            <div key={commentIndex}>
                                <h3 className="comment">{commentLine}</h3>
                                <button onClick={() => handleDeleteComment(commentIndex)} className="delete-button">
                                    Удалить комментарий
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <div>
                    <input
                        type="text"
                        placeholder="Новый комментарий"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="comment-input"
                    />
                    <button onClick={handleSendComment}>
                        Отправить комментарий
                    </button>
                </div>
            </div>
        </div>
    );
};

const PhotoGallery = ({ photos, onDeletePhoto }) => {
    return (
        <div className="photo-gallery">
            {photos.map((photo, index) => (
                <PhotoItem
                    key={index}
                    photo={photo}
                    index={index}
                    onDeletePhoto={onDeletePhoto}
                />
            ))}
        </div>
    );
};

export default PhotoGallery;
