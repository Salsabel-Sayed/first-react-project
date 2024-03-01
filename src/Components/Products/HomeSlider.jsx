
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slideimg1 from "../../assets/slide1.jpg";
import slideimg2 from "../../assets/slide2.jpg";
import slideimg3 from "../../assets/slide3.jpg";
import slideimg4 from "../../assets/slide4.jpg";


function HomeSlider() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (
    <>
      <div className="slider-container">
        <Slider {...settings}>
          <div>
            <img className="w-100" style={{height:"300px"}} src={slideimg1} alt="image slider 1" />
          </div>
          <div>
            <img className="w-100" style={{height:"300px"}} src={slideimg2} alt="image slider 2" />
          </div>
          <div>
            <img className="w-100" style={{height:"300px"}} src={slideimg3} alt="image slider 3" />
          </div>
          <div>
            <img className="w-100" style={{height:"300px"}} src={slideimg4} alt="image slider 3" />
          </div>
        </Slider>
      </div>
    </>
  );
}

export default HomeSlider
