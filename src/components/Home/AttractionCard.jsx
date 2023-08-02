
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CountdownTimer from "./Countdown";

const AttractionsGrid = () => {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    // Fetch the attraction data from the API endpoint (replace with your actual API endpoint)
    fetch('/attractions') // Replace '/api/attractions' with your actual API endpoint
      .then((response) => response.json())
      .then((data) => {
        setAttractions(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {attractions.map((attraction) => (
        <div key={attraction.id} className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">{attraction.attraction_name}</h2>
          <p className="text-gray-600 mb-4">{attraction.description}</p>
          <div className="mb-4">
            <Slider {...carouselSettings}>
              {[
                attraction.image_1,
                attraction.image_2,
                attraction.image_3,
                attraction.image_4,
              ].map((image, index) => (
                <img key={index} src={image} alt={`Image ${index + 1}`} className="w-full" />
              ))}
            </Slider>
          </div>
          <p className="text-gray-500">Deadline: <CountdownTimer deadline={attraction.deadline}/></p>
          <p className="text-blue-500">Budget: ${attraction.budget}</p>
          <a href={attraction.map_url} className="text-blue-500 hover:underline">
            View on Map
          </a>
        </div>
      ))}
    </div>
  );
};

export default AttractionsGrid;