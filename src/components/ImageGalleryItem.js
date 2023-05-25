import React from "react";

const ImageGalleryItem = ({ images, clickImg }) => {
  return (
    <>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <li className="ImageGalleryItem" key={id}>
          <img
            onClick={() => clickImg(largeImageURL, tags)}
            className="ImageGalleryItem-image"
            src={webformatURL}
            alt={tags}
          />
        </li>
      ))}
    </>
  );
};

export default ImageGalleryItem;
