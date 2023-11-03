import React, { useState } from 'react';

    // All images import
import image1 from './assets/images/image-1.webp';
import image2 from './assets/images/image-2.webp';
import image3 from './assets/images/image-3.webp';
import image4 from './assets/images/image-4.webp';
import image5 from './assets/images/image-5.webp';
import image6 from './assets/images/image-6.webp';
import image7 from './assets/images/image-7.webp';
import image8 from './assets/images/image-8.webp';
import image9 from './assets/images/image-9.webp';
import image10 from './assets/images/image-10.jpeg';
import image11 from './assets/images/image-11.jpeg';
import placeholder from './assets/images/placeholder.png';

function ImageGallery() {
  const [images, setImages] = useState([
    { id: 1, src: image1 },
    { id: 2, src: image2 },
    { id: 3, src: image3 },
    { id: 4, src: image4 },
    { id: 5, src: image5 },
    { id: 6, src: image6 },
    { id: 7, src: image7 },
    { id: 8, src: image8 },
    { id: 9, src: image9 },
    { id: 10, src: image10 },
    { id: 11, src: image11 },
  ]);

  const [selectedImages, setSelectedImages] = useState([]);
  const [draggingIndex, setDraggingIndex] = useState(-1);
  const [displayText, setDisplayText] = useState('Gallery');
  
  const handleImageClick = (imageId) => {
    const updatedImages = images.map((image) => {
      if (image.id === imageId) {
        return { ...image, isSelected: !image.isSelected };
      }
      return image;
    });

    setImages(updatedImages);

    const selectedIds = updatedImages
      .filter((image) => image.isSelected)
      .map((image) => image.id);
    setSelectedImages(selectedIds);

    // Update the display text based on selection
    setDisplayText(selectedIds.length === 1 ? '1 File Selected' : `${selectedIds.length} Files Selected`);
  };
    // Function for deleting selected images
  const handleDeleteSelected = () => {
    const updatedImages = images.filter((image) => !selectedImages.includes(image.id));
    setImages(updatedImages);
    setSelectedImages([]);
    
    setDisplayText('Gallery');
  };

  const handleDragStart = (index) => {
    setDraggingIndex(index);
  };

  const handleDragEnd = (index) => {
    if (draggingIndex === -1 || index === -1) {
      return;
    }

    const updatedImages = [...images];
    const [draggedImage] = updatedImages.splice(draggingIndex, 1);
    updatedImages.splice(index, 0, draggedImage);

    setImages(updatedImages);
    setDraggingIndex(-1);
  };

  return (
        // Gallery Header
    <div className="gallery">
      <div className='selected-count'>
          <div className="controls">
                  <h2 className={`gallery-title ${selectedImages.length > 0 ? 'selected-text' : ''}`}>{displayText}</h2>
            {selectedImages.length > 0 && (<button onClick={handleDeleteSelected}>Delete files</button>)}
          </div>
      </div>
      <hr />
       {/* Maping all images */}
      <div className="image-gallery">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`image-item ${image.isFeatured ? 'featured' : ''} ${
              image.isSelected ? 'selected' : ''
            } ${index === 0 ? 'first-image' : ''}`}
            onClick={() => handleImageClick(image.id)}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDragEnd(index)}
            draggable
          >
            {image.isSelected && (
              <div className="checkbox">
                <input type="checkbox" readOnly />
                <label></label>
              </div>
            )}
            <img src={image.src} alt={`Image ${image.id}`} />
          </div>
        ))}
        <div className="add-image">
          <div className='placeholder'>
            <img src={placeholder} alt="placeholder" />
            <button>Add Images</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageGallery;
