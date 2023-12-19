import React from "react";
import Slider from "react-slick";
import { useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './AppSlider.css'

const AppSlider = () => {
  const sliderRef = useRef(null);

  const ArrowLeft = (props) => (
    <button onClick={() => sliderRef.current.slickPrev()} className="slick-arrow slick-prev">
    
    </button>
  );

  const ArrowRight = (props) => (
    <button onClick={() => sliderRef.current.slickNext()} className="slick-arrow slick-next">
    </button>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <ArrowLeft />,
    nextArrow: <ArrowRight />,
  };

  return (
    <div className="slider-container">
      <Slider ref={sliderRef} {...settings}>
        <div className="slide">
        <img src="/public/pics/slider/image1.jpeg" alt="Image 1" />
          
          <div className="animation">
          <h1 className="heading1">Investing in Bitcoin. </h1>
       
        <p>Start your investment journey effortlessly. Our platform simplifies the process, making it accessible for everyone.</p>
          </div>
        </div>
        <div className="slide">
        <img src="/pics/slider/backgournd-gif.gif" alt="Image 2" />
          <div className="animation">
          <h1 className="heading1">Investing in Bitcoin </h1>
          <h1 >Made Easy.</h1>
        <p>Start your investment journey effortlessly. Our platform simplifies the process, making it accessible for everyone.</p>
          </div>
        </div>
        <div className="slide">
          <img src="/pics/slider/backgournd-gif1.gif" alt="Image 3" />
          <div className="animation">
          <h1 className="heading1" >Secure Your Future 
         </h1>
       <h1 className="h1-bit" > with Bitcoin.</h1>
       <p>Discover the potential of Bitcoin as a stable investment. Our platform offers secure transactions and expert guidance to help you enter the world of digital currency.</p>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default AppSlider;