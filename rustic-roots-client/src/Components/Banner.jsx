import React, { useEffect, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { NavLink } from 'react-router-dom';
import Lottie from 'react-lottie'; 
import { Fade } from 'react-awesome-reveal'; 

import image1 from '../assets/banner/1.jpg';
import image2 from '../assets/banner/2.jpg';
import image3 from '../assets/banner/3.jpg';

import titleLottieAnimation from '../assets/animation/Animation - 1735144071761.json'
import leftArrowAnimation from '../assets/animation/Animation - 1733653381871.json';
import rightArrowAnimation from '../assets/animation/Animation - 1733653518186.json';


const BannerSlide = ({ image, title, description, buttonText, buttonLink, textColor = 'text-white' }) => (
  <div
    className="hero w-full h-full"
    style={{
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="hero-content text-center text-neutral-content flex flex-col lg:flex-row items-center justify-between w-full h-full">
      <div className="max-w-2xl p-6">
       
        <Fade bottom>
          <div className="mb-4">
            <Lottie 
              options={{
                loop: true,
                autoplay: true,
                animationData: titleLottieAnimation, 
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }} 
              height={200} 
              width={200}  
            />
          </div>
        </Fade>
        
        
        <Fade bottom>
          <h1 className={`text-4xl font-bold ${textColor}`}>{title}</h1>
        </Fade>
        
        <Fade bottom delay={300}>
          <p className="p-6">{description}</p>
        </Fade>
        
        <Fade bottom delay={600}>
          <NavLink to={buttonLink}>
            <button className="btn btn-success hover:bg-green-300 hover:rounded-3xl ">{buttonText}</button>
          </NavLink>
        </Fade>
      </div>
    </div>
  </div>
);


const Banner = () => {
  const swiperRef = useRef(null);

  
  const handleMouseEnter = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.stop();
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.autoplay.start();
    }
  }, []);

  const slideNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const slidePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  
  const leftArrowOptions = {
    loop: true,
    autoplay: true,
    animationData: leftArrowAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  
  const rightArrowOptions = {
    loop: true,
    autoplay: true,
    animationData: rightArrowAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div
      className="relative w-full h-[600px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Swiper
        ref={swiperRef}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={false} 
        navigation={false} 
        className="h-full"
      >
       
        <SwiperSlide>
          <BannerSlide
          
            image={image1}
            title="A Journey to Authentic Flavors"
            description="Discover the finest selection of sports equipment tailored for athletes and enthusiasts alike. From cutting-edge gear to stylish apparel, EquipSports offers premium-quality products for all your sporting needs."
            buttonText="Explore Our Foods"
            buttonLink="/allFoods"
            textColor="text-black"
            
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerSlide
            image={image2}
            title=" Rooted in Flavor, Inspired by Nature"
            description="Welcome to EquiSports, the ultimate online destination for high-quality sports gear and apparel. Whether you're a seasoned professional or a passionate beginner, we have everything you need."
            buttonText="Our Foods"
            buttonLink="/allFoods"
            textColor="text-white"
          />
        </SwiperSlide>
        <SwiperSlide>
          <BannerSlide
            image={image3}
            title="Rustic Roots: Discover the Heart of Comfort Food"
            description="Step into greatness with premium sports gear tailored to elevate your performance. Our range ensures you’re equipped for success."
            buttonText="View More..."
            buttonLink="/allFoods"
            textColor="text-black"
          />
        </SwiperSlide>
      </Swiper>

     
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
        <button
          onClick={slidePrev}
          className="text-white bg-transparent rounded-full shadow-lg"
        >
          <Lottie options={leftArrowOptions} height={40} width={40} />
        </button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
        <button
          onClick={slideNext}
          className="text-white bg-transparent rounded-full p-2 shadow-lg"
        >
          <Lottie options={rightArrowOptions} height={40} width={40} />
        </button>
      </div>
    </div>
  );
};

export default Banner;