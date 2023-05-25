import React from "react";
import ImageGalleryItem from "./ImageGalleryItem";

const ImageGallery = ({ images, onClickImg }) => {
  return (
    <ul className="ImageGallery">
      <ImageGalleryItem images={images} clickImg={onClickImg} />
    </ul>
  );
};

export default ImageGallery;
