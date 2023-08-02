import React from 'react';

const AttractionsTable = ({ attractions, handleAttractionSelect, fetchAttractions }) => {
  const handleDelete = async (id) => {
    try {
      await fetch(`/attractions/${id}`, {
        method: 'DELETE',
      });
      fetchAttractions();
    } catch (error) {
      console.error('Error deleting attraction:', error);
    }
  };

  return (
    <table className="w-full mt-4">
      <thead>
        <tr>
          <th>Attraction Name</th>
          <th>Description</th>
          <th>Image</th>
          {/* ... Other columns */}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {attractions.map((attraction) => (
          <tr key={attraction.id}>
            <td>{attraction.attraction_name}</td>
            <td>{attraction.description}</td>
            <td> <img src= {attraction.image_1} alt= 'image' style={{width: 70}} /></td>
            {/* ... Other columns */}
            <td>
              <button
                className="text-red-600"
                onClick={() => handleDelete(attraction.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttractionsTable;
