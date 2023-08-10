import React, { useState, useEffect } from 'react';
import AttractionsTable from '../components/AdminDash/AttractionsTable';
import AttractionsForm from '../components/AdminDash/AttractionsForm';

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
    <div className="bg-gray-200 p-4 flex flex-col">

      {/* ATTRACTION FORM */}

        <div>
          <AttractionsForm
            selectedAttraction={selectedAttraction}
            fetchAttractions={fetchAttractions}
          />
        </div>

      <div className="flex flex-row space-x-4">

    {/* ATTRACTION TABLE */}

        <div className="flex-grow">
          <AttractionsTable
            attractions={attractions}
            handleAttractionSelect={handleAttractionSelect}
            fetchAttractions={fetchAttractions}
          />
        </div>
      
      </div>
    </div>
  );
};

export default AttractionsDashboard;
