import React, { useState, useEffect } from 'react';

import AttractionsTable from '../components/AdminDash/AttractionsTable';
import AttractionsForm from '../components/AdminDash/AttractionsForm';
// import AnalyticsComponent from '../components/AdminDash/AnalyticsComponent';


const AttractionsDashboard = () => {
  const [attractions, setAttractions] = useState([]);
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  useEffect(() => {
    fetchAttractions();
  }, []);

  const fetchAttractions = async () => {
    try {
      const response = await fetch('/attractions');
      const data = await response.json();
      setAttractions(data);
    } catch (error) {
      console.error('Error fetching attractions:', error);
    }
  };

  const handleAttractionSelect = (attraction) => {
    setSelectedAttraction(attraction);
  };

  return (
    <div className="bg-gray-200 p-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          {/* <AnalyticsComponent attractions={attractions} /> */}
          <AttractionsTable
        attractions={attractions}
        handleAttractionSelect={handleAttractionSelect}
        fetchAttractions={fetchAttractions}
      />
        </div>
        <div>
          <AttractionsForm
            selectedAttraction={selectedAttraction}
            fetchAttractions={fetchAttractions}
          />
        </div>
      </div>
      {/* <AttractionsTable
        attractions={attractions}
        handleAttractionSelect={handleAttractionSelect}
        fetchAttractions={fetchAttractions}
      /> */}
    </div>
  );
};

export default AttractionsDashboard;

