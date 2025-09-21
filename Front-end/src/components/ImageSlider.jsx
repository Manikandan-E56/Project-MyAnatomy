import React from 'react';
import Slider from 'react-slick';

// Import the required CSS files for the image slider
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  // Image URLs that were found
  const images = [
    "https://a0.anyrgb.com/pngimg/984/1628/cartoon-college-students-student-group-student-school-college-students-social-group-deposit-fun-community-public-relations-conversation.png",
    "https://thumbs.dreamstime.com/b/cartoon-students-working-together-group-project-classroom-collaborative-fun-d-illustration-344588941.jpg",
    "https://media.istockphoto.com/id/1385509455/vector/business-communication-concept.jpg?s=612x612&w=0&k=20&c=BqAT-opyxl84x3IKO4JMi6E8YB8AJIPU_7q49c8FojY=",
    "https://t3.ftcdn.net/jpg/03/25/80/02/360_F_325800248_w9sG5xSOXAK7S0zZaRIhIR3RW6RtT3WF.jpg",
    "https://t3.ftcdn.net/jpg/05/81/65/08/360_F_581650862_tdOma1hWudGjDqD8CzExG5YP8lvtGJa2.jpg"
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: true
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-10">
      <Slider {...settings}>
        {images.map((imgUrl, index) => (
          <div key={index} className="px-2">
            <img 
              src={imgUrl} 
              alt={`Student Club Image ${index + 1}`} 
              className="w-full h-auto object-cover rounded-lg shadow-lg"
              style={{ maxHeight: '450px' }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;