import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import slideimg1 from "../../assets/slide1.jpg";
import slideimg2 from "../../assets/slide2.jpg";
import slideimg3 from "../../assets/slide3.jpg";
import slideimg4 from "../../assets/slide4.jpg";


function SliderSection() {
  return (
    <>
    <Carousel
  additionalTransfrom={1}
  arrows
  autoPlaySpeed={1000}
  centerMode={false}
  className="sliderHome"
  containerClass="container-fluid"
  dotListClass=""
  draggable
  focusOnSelect={false}
  infinite
  itemClass=""
  keyBoardControl
  minimumTouchDrag={80}
  pauseOnHover
  renderArrowsWhenDisabled={false}
  renderButtonGroupOutside={false}
  renderDotsOutside={false}
  responsive={{
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 1
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 1
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 1
    }
  }}
  rewind={false}
  rewindWithAnimation={false}
  rtl={false}
  shouldResetAutoplay
  showDots
  sliderClass=""
  slidesToSlide={1}
  swipeable
>
  <img 
    src={slideimg1}
    style={{
      display: 'block',
      height: '40vh',
     margin: "auto",
      width: '100%'
    }}
  />
  <img
    src={slideimg2}
    style={{
      display: 'block',
      height: '40vh',
      margin: "auto",
      width: '100%'
    }}
  />
  <img
    src={slideimg3}
    style={{
      display: 'block',
      height: '40vh',
      margin: "auto",
      width: '100%'
    }}
  />
  <img
    src={slideimg4}
    style={{
      display: 'block',
      height: '40vh',
      margin: "auto",
      width: '100%'
    }}
  />

</Carousel>
      
    </>
  )
}

export default SliderSection
