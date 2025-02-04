import React, { useState, useEffect, useRef } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { motion } from 'framer-motion';
import imageBackground from '../../assets/banner/Red and Yellow Illustration Food Facebook Cover.jpg';

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [visibleImages, setVisibleImages] = useState(12);
  const galleryEndRef = useRef(null);

  const images = [

    {
      src: 'https://i.ibb.co.com/Sd2YRBf/side-view-casserole-with-sauces.jpg',
      alt: 'Dish 1',
      name: 'Sample Dish 1',
      userName: 'Chef John',
      description: 'A delightful eclair filled with rich chocolate cream.',
    },
    {
      src: 'https://i.ibb.co.com/z8h9Jk5/potato-balls-with-vegetables-sauce-wooden-board.jpg',
      alt: 'Dish 2',
      name: 'Sample Dish 2',
      userName: 'Chef Sarah',
      description: 'A buttery, flaky, and golden croissant freshly baked.',
    },
    {
      src: 'https://i.ibb.co.com/NNrmttR/meat-sadj-vegetables-greens-spices-top-view.jpg',
      alt: 'Dish 3',
      name: 'meat-sadj-vegetables-greens-spices',
      userName: 'Chef Sarah',
      description: 'A buttery, flaky, and golden croissant freshly baked.',
    },
    {
      src: 'https://i.ibb.co.com/tZBT1mh/top-view-fried-potatoes-with-greens-different-seasonings-dark-surface.jpg',
      alt: 'Dish 4',
      name: 'fried-potatoes-with-greens-different',
      userName: 'Chef Sarah',
      description: 'A buttery, flaky, and golden croissant freshly baked.',
    },
    {
      src: 'https://i.ibb.co.com/hmYKzdV/potato-patties-topped-with-beef-patties-shoe-strings.jpg',
      alt: 'Dish 4',
      name: 'potato-patties-topped-with-beef-patties',
      userName: 'Chef Sarah',
      description: 'A buttery, flaky, and golden croissant freshly baked.',
    },
    {
      src: 'https://i.ibb.co.com/K92QkFD/crilled-chicken-bread-piece-greens-pepper-sauce-spices-side-view.jpg',
      alt: 'Dish 5',
      name: 'chicken-bread-piece-greens-pepper-sauce-spices',
      userName: 'Chef Sarah',
      description: 'A buttery, flaky, and golden croissant freshly baked.',
    },
    {
      src: 'https://i.ibb.co.com/XyR4CNS/x7j-Pxj9-Yt-Jfv97hn-C3m-Mm-Qog5-Vwu-Yoj-Z7tlrhcz-GXIV.webp',
      alt: 'Dish 2',
      name: 'Sample Dish 2',
      userName: 'Chef Sarah',
      description: 'A buttery, flaky, and golden croissant freshly baked.',
    },
    {
      src: 'https://i.ibb.co.com/6B9z6cd/foodiesfeed-com-braided-challah-in-hands.jpg',
      alt: 'Dish 2',
      name: 'braided-challah',
      userName: 'Chef Sarah',
      description: 'A buttery, flaky, and golden croissant freshly baked.',
    },
    {
      src: 'https://i.ibb.co.com/RgWNDX8/fried-shrimps-served-with-lettuce-sauce.jpg',
      alt: 'Dish 2',
      name: 'fried-shrimps-served-with-lettuce-sauce',
      userName: 'Chef Sarah',
      description: 'A buttery, flaky, and golden croissant freshly baked.',
    },
    {
      src: 'https://i.ibb.co.com/6wMRk2D/crispy-tubtim-fish-salad-thai-food-herb.jpg',
      alt: 'Dish 2',
      name: 'crispy-tubtim-fish-salad-thai-food-herb',
      userName: 'Chef Sarah',
      description: 'A buttery, flaky, and golden croissant freshly baked.',
    },
   
    
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log('Bottom reached, loading more images...');
          loadMoreImages();
        }
      },
      { threshold: 1.0 }
    );

    if (galleryEndRef.current) {
      observer.observe(galleryEndRef.current);
    }

    return () => {
      if (galleryEndRef.current) {
        observer.unobserve(galleryEndRef.current);
      }
    };
  }, []);

  const loadMoreImages = () => {
    setVisibleImages((prev) => Math.min(prev + 12, images.length));
  };

  const openLightbox = (index) => {
    setCurrentImage(index);
    setIsOpen(true);
  };

  return (
    <div>
    
      <div
        className="relative mb-10 h-60 flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${imageBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <h1 className="relative text-7xl font-bold bottom-10">Our Food Gallery</h1>
        <div className="text-2xl absolute flex items-center mx-auto bottom-10">
          <a href="/" className="hover:text-green-500 font-semibold text-white transition px-4 py-2 rounded">
            Home
          </a>
          <h1>||</h1>
          <a href="/all-food" className="hover:text-green-500 font-semibold text-white transition px-4 py-2 rounded">
            All Food
          </a>
        </div>
      </div>

     
      <div className="w-11/12 mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 mb-10">
        {images.slice(0, visibleImages).map((image, index) => (
          <motion.div
            key={index}
            className="relative cursor-pointer rounded shadow group"
            onClick={() => openLightbox(index)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src={image.src} alt={image.alt} className="w-full h-72 object-cover rounded" />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <div className="text-center text-white px-4">
                <h2 className="text-lg font-bold">{image.name}</h2>
                <p className="text-sm italic">By {image.userName}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

     
      <div ref={galleryEndRef} className="h-10"></div>

      
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        index={currentImage}
        slides={images.map((img) => ({
          src: img.src,
          alt: img.alt,
          title: img.name,
          description: img.description,
        }))}
      />
    </div>
  );
};

export default Gallery;
