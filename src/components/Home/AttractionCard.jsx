import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CountdownTimer from './Countdown';
const AttractionsGrid = () => {
  const [attractions, setAttractions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const attractionsPerPage = 3;
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
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const renderPagination = () => {
    const pageNumbers = Math.ceil(attractions.length / attractionsPerPage);
    return (
      <ul className="flex justify-center mt-4">
        {Array.from({ length: pageNumbers }, (_, index) => index + 1).map((pageNumber) => (
          <li
            key={pageNumber}
            className={`mx-1 cursor-pointer rounded-full px-3 py-1 ${
              currentPage === pageNumber
                ? 'bg-blue-500 text-white font-bold'
                : 'text-blue-500 hover:bg-blue-100'
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        ))}
      </ul>
    );
  };
  const indexOfLastAttraction = currentPage * attractionsPerPage;
  const indexOfFirstAttraction = indexOfLastAttraction - attractionsPerPage;
  const currentAttractions = attractions.slice(indexOfFirstAttraction, indexOfLastAttraction);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {currentAttractions.map((attraction) => (
          <Link to={`/attraction/${attraction.id}`} key={attraction.id} className="no-underline">
            {/* Wrap the card in a Link component and use the attraction ID in the URL */}
            <div className="bg-white shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-md">
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
                    <img
                      key={index}
                      src={image}
                      alt="tour"
                      className="w-full h-48 object-cover"
                    />
                  ))}
                </Slider>
              </div>
              <p className="text-gray-500">Deadline: <CountdownTimer deadline={attraction.deadline}/></p>
              <p className="text-blue-500">Budget: ${attraction.budget}</p>
              <a href={attraction.map_url} className="text-blue-500 hover:underline">
                View on Map
              </a>
            </div>
          </Link>
        ))}
      </div>
      {renderPagination()}
    </div>
  );
};
export default AttractionsGrid;







