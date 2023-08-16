
// import React from 'react';
// import { useAuth } from '../../AuthContext';
// import { useItinerary } from '../../ItineraryContext';
// import DestinationsTable from './DestinationsTable';
// import Swal from 'sweetalert2';

// const DestinationInput = () => {
//   const { user } = useAuth();
//   const { userDestinations, updateDestinations } = useItinerary();

//   const handleSubmit = () => {
//     Swal.fire({
//       title: 'Add a Destination',
//       html: `
//         <form id="destination-form">
//           <input type="text" id="swal-input-name" class="swal2-input" placeholder="Destination Name" required>
//           <input id="swal-input-description" class="swal2-input" placeholder="Description" required>
//           <input type="text" id="swal-input-location" class="swal2-input" placeholder="Location" required>
//         </form>
//       `,
//       showCancelButton: true,
//       confirmButtonText: 'Save Destination',
//       preConfirm: () => {
//         const swalName = document.getElementById('swal-input-name').value;
//         const swalDescription = document.getElementById('swal-input-description').value;
//         const swalLocation = document.getElementById('swal-input-location').value;

//         return fetch('/destinations', {
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
//           .then((response) => response.json())
//           .then((data) => {
//             if (data.id) {
//               // Update destinations state after successfully adding a destination
//               updateDestinations([...userDestinations, data]); // Add the new destination to the array
//               Swal.fire({
//                 title: 'Success',
//                 text: 'Destination saved successfully!',
//                 icon: 'success',
//               });
//             } else {
//               Swal.fire({
//                 title: 'Error',
//                 text: 'Error saving destination. Please try again.',
//                 icon: 'error',
//               });
//             }
//           })
//           .catch((error) => {
//             console.error('Error saving destination:', error);
//           });
//       },
//     });
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-2xl font-bold mb-4">Add a Destination</h2>
//       <form onSubmit={(event) => event.preventDefault()} className="flex flex-wrap -mx-4">
//         <div className="w-full px-4 flex justify-center">
//           <button
//             type="button"
//             onClick={handleSubmit}
//             className="bg-blue-500 text-white px-2 w-1/4 py-1 rounded"
//           >
//             Add Destination
//           </button>
//         </div>
//       </form>
//       <DestinationsTable />
//     </div>
//   );
// };

// export default DestinationInput;


import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useItinerary } from '../../ItineraryContext';
import Swal from 'sweetalert2';

const DestinationInput = () => {
  const { user } = useAuth();
  const { userDestinations, updateDestinations } = useItinerary();
  const [userDestinationsFromAPI, setUserDestinationsFromAPI] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`/users/${user.id}/destinations`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch user destinations');
          }
        })
        .then((data) => {
          setUserDestinationsFromAPI(data);
        })
        .catch((error) => {
          console.error('User destinations fetch failed:', error);
        });
    }
  }, [user,userDestinations]);

  const handleDeleteDestination = (destinationId) => {
    fetch(`/destinations/${destinationId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setUserDestinationsFromAPI((prevDestinations) =>
            prevDestinations.filter((destination) => destination.id !== destinationId)
          );
        } else {
          throw new Error('Failed to delete destination');
        }
      })
      .catch((error) => {
        console.error('Delete destination failed:', error);
      });
  };

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


          {/* Render table rows here using userDestinationsFromAPI */}
      
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


      <h2 className="text-2xl font-bold mb-4">Destinations</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {userDestinationsFromAPI.map((destination) => (
            <tr key={destination.id}>
              <td className="px-6 py-4 whitespace-nowrap">{destination.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{destination.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">{destination.location}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <p
                  onClick={() => handleDeleteDestination(destination.id)}
                  className="text-red-600 hover:text-red-800"
                  style={{cursor:"pointer"}}
                >
                  X
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default DestinationInput;






// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../../AuthContext';
// import { useItinerary } from '../../ItineraryContext';
// import Swal from 'sweetalert2';

// const DestinationInput = () => {
//   const { user } = useAuth();
//   const { userDestinations, updateDestinations } = useItinerary();
//   const [destinations, setDestinations] = useState([]); // Combine both userDestinationsFromAPI and userDestinations into one

//   const fetchDestinations = () => {
//     if (user) {
//       fetch(`/users/${user.id}/destinations`)
//         .then((response) => {
//           if (response.ok) {
//             return response.json();
//           } else {
//             throw new Error('Failed to fetch user destinations');
//           }
//         })
//         .then((data) => {
//           setDestinations(data);
//         })
//         .catch((error) => {
//           console.error('User destinations fetch failed:', error);
//         });
//     }
//   };
  
//   useEffect(() => {
//     // Fetch destinations data when the component mounts or when userDestinations changes
//     fetchDestinations();
//   }, [user, userDestinations]);
  

//   const handleDeleteDestination = (destinationId) => {
//     fetch(`/destinations/${destinationId}`, {
//       method: 'DELETE',
//     })
//       .then((response) => {
//         if (response.ok) {
//           setDestinations((prevDestinations) =>
//             prevDestinations.filter((destination) => destination.id !== destinationId)
//           );
  
//           updateDestinations((prevUserDestinations) =>
//             prevUserDestinations.filter((destination) => destination.id !== destinationId)
//           );
  
//           // Reload the page to reflect the updated state
//           // window.location.reload();
//         } else {
//           throw new Error('Failed to delete destination');
//         }
//       })
//       .catch((error) => {
//         console.error('Delete destination failed:', error);
//       });
//   };
  
  
  
//   const handleSubmit = () => {
//     Swal.fire({
//       title: 'Add a Destination',
//       html: `
//         <form id="destination-form">
//           <input type="text" id="swal-input-name" class="swal2-input" placeholder="Destination Name" required>
//           <input id="swal-input-description" class="swal2-input" placeholder="Description" required>
//           <input type="text" id="swal-input-location" class="swal2-input" placeholder="Location" required>
//         </form>
//       `,
//       showCancelButton: true,
//       confirmButtonText: 'Save Destination',
//       preConfirm: () => {
//         const swalName = document.getElementById('swal-input-name').value;
//         const swalDescription = document.getElementById('swal-input-description').value;
//         const swalLocation = document.getElementById('swal-input-location').value;

//         return fetch('/destinations', {
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
//           .then((response) => response.json())
//           .then((data) => {
//             if (data.id) {
//               // Update destinations state after successfully adding a destination
//               updateDestinations([...userDestinations, data]); // Add the new destination to the array
//               Swal.fire({
//                 title: 'Success',
//                 text: 'Destination saved successfully!',
//                 icon: 'success',
//               });
//             } else {
//               Swal.fire({
//                 title: 'Error',
//                 text: 'Error saving destination. Please try again.',
//                 icon: 'error',
//               });
//             }
//           })
//           .catch((error) => {
//             console.error('Error saving destination:', error);
//           });
//       },
//     });
//   };


//   return (
//     <div className="container mx-auto px-4 py-8">
      
//                 {/* Render table rows here using userDestinationsFromAPI */}
      
//                 <h2 className="text-2xl font-bold mb-4">Add a Destination</h2>
//       <form onSubmit={(event) => event.preventDefault()} className="flex flex-wrap -mx-4">
//         <div className="w-full px-4 flex justify-center">
//           <button
//             type="button"
//             onClick={handleSubmit}
//             className="bg-blue-500 text-white px-2 w-1/4 py-1 rounded"
//           >
//             Add Destination
//           </button>
//         </div>
//       </form>

//       {/* Render table rows here using destinations */}
//       <h2 className="text-2xl font-bold mb-4">Destinations</h2>
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Name
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Description
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Location
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {destinations.map((destination) => (
//             <tr key={destination.id}>
//               <td className="px-6 py-4 whitespace-nowrap">{destination.name}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{destination.description}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{destination.location}</td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 <p
//                   onClick={() => handleDeleteDestination(destination.id)}
//                   className="text-red-600 hover:text-red-800"
//                   style={{ cursor: 'pointer' }}
//                 >
//                   X
//                 </p>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DestinationInput;
