import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoIosArrowRoundBack } from 'react-icons/io'; // Import the back icon from 'react-icons/io'
import CountdownTimer from './Countdown';

const AttractionDetails = () => {
  const [attraction, setAttraction] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the specific attraction data from the API endpoint (replace with your actual API endpoint)
    fetch(`/attractions/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setAttraction(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (!attraction) {
    return <div>Loading...</div>;
  }

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="p-4">
      <div className="bg-white shadow-lg rounded-lg p-4">
        <div className="flex items-center mb-4">
          <IoIosArrowRoundBack className="text-blue-500 text-2xl mr-2 cursor-pointer" style={{fontSize:"2em"}} onClick={handleBack} />
          <h2 className="text-xl font-bold text-center">{attraction.attraction_name}</h2>
        </div>
        <p className="text-gray-600 mb-4">{attraction.description}</p>
        <div className="mb-4">
          <Slider {...carouselSettings}>
            {[
              attraction.image_1,
              attraction.image_2,
              attraction.image_3,
              attraction.image_4,
            ].map((image, index) => (
              <img
                key={index}
                src={image}
                alt="tours"
                className="w-full h-80 object-cover"
              />
            ))}
          </Slider>
        </div>
        <p className="text-gray-500">Deadline: <CountdownTimer deadline={attraction.deadline} /></p>
        <p className="text-blue-500">Budget: ${attraction.budget}</p>
        <a href={attraction.map_url} className="text-blue-500 hover:underline">
          View on Map
        </a>


      </div>
    </div>
  );
};

export default AttractionDetails;
