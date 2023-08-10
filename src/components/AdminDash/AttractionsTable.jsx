import React from 'react';
import Swal from 'sweetalert2';

const AttractionsTable = ({ attractions, fetchAttractions }) => {
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Confirm Delete',
        text: 'Are you sure you want to delete this attraction?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
        await fetch(`/attractions/${id}`, {
          method: 'DELETE',
        });
        fetchAttractions();
        Swal.fire('Deleted!', 'The attraction has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting attraction:', error);
    }
  };

  const handleRowClick = (attraction) => {
    Swal.fire({

      html: `
        <p style="text-align: center; margin-bottom: 10px;">${attraction.attraction_name}</p>
        <img src="${attraction.image_1}" alt="Attraction Image" style="display: block; margin: 0 auto; max-width: 100%;">
        <p>${attraction.description}</p>
      `,
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Close',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(attraction.id);
      }
    });
  };

  return (
    <table className="w-full mt-4">
      <thead>
        <tr>
          <th>Attraction Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {attractions.map((attraction) => (
          <tr
            key={attraction.id}
            style={{ borderBottom: '1px solid #ddd', cursor: 'pointer' }}
            onClick={() => handleRowClick(attraction)}
          >
            <td>{attraction.attraction_name}</td>
            <td>{attraction.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AttractionsTable;
