import React, { useState } from "react";
import { Container } from "react-bootstrap";
import styles from './Gallery.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Gallery = ({ photos }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Button operations to change photo
  const goToPreviousPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => {
      const newIndex = prevIndex === 0 ? photos.length - 1 : prevIndex - 1;
      return newIndex;
    });
  };

  const goToNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % photos.length;
      return newIndex;
    });
  };

  return ( 
    <Container className={styles.galleryContainer}>
      <Container className={styles.imageContainer}>
        <img 
          src={photos[currentPhotoIndex]} 
          alt="Photos" 
          className={styles.photo} 
        />
      </Container>
      <Container className={styles.buttonContainer}>
        <button 
          type="button"
          variant="success" 
          className={styles.galleryButton} 
          onClick={goToPreviousPhoto}>
            <FontAwesomeIcon icon={faArrowLeft} />
        </button >
        <button
          type="button" 
          variant="success" 
          className={styles.galleryButton} 
          onClick={goToNextPhoto}>
            <FontAwesomeIcon icon={faArrowRight} />
        </button >
      </Container>
    </Container>
  );
};

export default Gallery;