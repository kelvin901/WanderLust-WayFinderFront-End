// // DestinationsTable.jsx
// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../../AuthContext';

// const DestinationsTable = () => {

//   const { user } = useAuth(); // Fetch the current logged-in user

//   // State to store the user data fetched using the fetch function
//   const [currentUser, setCurrentUser] = useState(null);
//   const [userDestinationsFromAPI, setUserDestinationsFromAPI] = useState([]);

//   useEffect(() => {
//     if (user) {
//       // Fetch user data
//       fetch(`/users/${user.id}`) // Replace with the correct API endpoint for fetching user data
//         .then((response) => {
//           if (response.ok) {
//             return response.json();
//           } else {
//             throw new Error('Failed to fetch user data');
//           }
//         })
//         .then((data) => {
//           setCurrentUser(data);
//         })
//         .catch((error) => {
//           console.error('User data fetch failed:', error);
//         });

//       // Fetch user destinations
//       fetch(`/users/${user.id}/destinations`) // Replace with the correct API endpoint for fetching user destinations
//         .then((response) => {
//           if (response.ok) {
//             return response.json();
//           } else {
//             throw new Error('Failed to fetch user destinations');
//           }
//         })
//         .then((data) => {
//           setUserDestinationsFromAPI(data);
//         })
//         .catch((error) => {
//           console.error('User destinations fetch failed:', error);
//         });
//     }
//   }, [user]);

//   return (
//     <div className="mt-8">
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
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-200">
//           {userDestinationsFromAPI.map((destination) => (
//             <tr key={destination.id}>
//               <td className="px-6 py-4 whitespace-nowrap">{destination.name}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{destination.description}</td>
//               <td className="px-6 py-4 whitespace-nowrap">{destination.location}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default DestinationsTable;

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';

const DestinationsTable = () => {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [userDestinationsFromAPI, setUserDestinationsFromAPI] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`/users/${user.id}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Failed to fetch user data');
          }
        })
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((error) => {
          console.error('User data fetch failed:', error);
        });

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
  }, [user]);

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

  return (
    <div className="mt-8">
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

export default DestinationsTable;
