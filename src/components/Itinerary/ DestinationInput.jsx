// import React from 'react';
// import { useAuth } from '../../AuthContext';
// import Swal from 'sweetalert2'; // Import SweetAlert

// const DestinationInput = () => {
//   const { user } = useAuth();


//   const handleSubmit = () => {
//     Swal.fire({
//       title: 'Add a Destination',
//       html: `
//       <form id="destination-form">
//       <input type="text" id="swal-input-name" class="swal2-input" placeholder="Destination Name" required>
//       <input id="swal-input-description" class="swal2-input" placeholder="Description" required>
//       <input type="text" id="swal-input-location" class="swal2-input" placeholder="Location" required>
//     </form>
//       `,
//       showCancelButton: true,
//       confirmButtonText: 'Save Destination',
//       preConfirm: () => {
//         const swalName = document.getElementById('swal-input-name').value;
//         const swalDescription = document.getElementById('swal-input-description').value;
//         const swalLocation = document.getElementById('swal-input-location').value;
        
//         // Replace this with your actual fetch logic
//         fetch('/destinations', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             name: swalName,
//             description: swalDescription,
//             location: swalLocation,
//             user_id: user.id,
//           }),
//         })
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.id) {
//             Swal.fire({
//               title: 'Success',
//               text: 'Destination saved successfully!',
//               icon: 'success',
//             });
//           } else {
//             Swal.fire({
//               title: 'Error',
//               text: 'Error saving destination. Please try again.',
//               icon: 'error',
//             });
//           }
//         })
//         .catch((error) => {
//           console.error('Error saving destination:', error);
//         });
//     },
//   });
// };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-2xl font-bold mb-4">Add a Destination</h2>
//       <form onSubmit={(event) => event.preventDefault()} className="flex flex-wrap -mx-4">
//         <div className="w-full px-4 flex justify-center">
//           <button
//             type="button"
//             onClick={handleSubmit} // Open the SweetAlert form on button click
//             className="bg-blue-500 text-white px-2 w-1/4 py-1 rounded"
//           >
//             Add Destination
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default DestinationInput;



// DestinationInput.jsx
import React from 'react';
import { useAuth } from '../../AuthContext';
import { useItinerary } from '../../ItineraryContext';
import Swal from 'sweetalert2';

const DestinationInput = () => {
  const { user } = useAuth();
  const { userDestinations, updateDestinations } = useItinerary();

  const handleSubmit = () => {
    Swal.fire({
      title: 'Add a Destination',
      html: `
        <form id="destination-form">
          <input type="text" id="swal-input-name" class="swal2-input" placeholder="Destination Name" required>
          <input id="swal-input-description" class="swal2-input" placeholder="Description" required>
          <input type="text" id="swal-input-location" class="swal2-input" placeholder="Location" required>
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Save Destination',
      preConfirm: () => {
        const swalName = document.getElementById('swal-input-name').value;
        const swalDescription = document.getElementById('swal-input-description').value;
        const swalLocation = document.getElementById('swal-input-location').value;

        return fetch('/destinations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: swalName,
            description: swalDescription,
            location: swalLocation,
            user_id: user.id,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.id) {
              // Update destinations state after successfully adding a destination
              updateDestinations([...userDestinations, data]); // Add the new destination to the array
              Swal.fire({
                title: 'Success',
                text: 'Destination saved successfully!',
                icon: 'success',
              });
            } else {
              Swal.fire({
                title: 'Error',
                text: 'Error saving destination. Please try again.',
                icon: 'error',
              });
            }
          })
          .catch((error) => {
            console.error('Error saving destination:', error);
          });
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Add a Destination</h2>
      <form onSubmit={(event) => event.preventDefault()} className="flex flex-wrap -mx-4">
        <div className="w-full px-4 flex justify-center">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-2 w-1/4 py-1 rounded"
          >
            Add Destination
          </button>
        </div>
      </form>
    </div>
  );
};

export default DestinationInput;
