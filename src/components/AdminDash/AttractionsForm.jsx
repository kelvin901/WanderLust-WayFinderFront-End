// import React, { useState, useEffect } from 'react';

// const AttractionsForm = ({ selectedAttraction, fetchAttractions }) => {
//   const [attractionData, setAttractionData] = useState({
//     attraction_name: '',
//     description: '',
//     image_1: '',
//     image_2: '',
//     image_3: '',
//     image_4: '',
//     deadline: '',
//     map_url: '',
//     budget: '',
//   });

//   useEffect(() => {
//     if (selectedAttraction) {
//       setAttractionData(selectedAttraction);
//     } else {
//       resetForm();
//     }
//   }, [selectedAttraction]);

//   const resetForm = () => {
//     setAttractionData({
//       attraction_name: '',
//       description: '',
//       image_1: '',
//       image_2: '',
//       image_3: '',
//       image_4: '',
//       deadline: '',
//       map_url: '',
//       budget: '',
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (selectedAttraction) {
//         await fetch(`/attractions/${selectedAttraction.id}`, {
//           method: 'PATCH',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(attractionData),
//         });
//       } else {
//         await fetch('/attractions', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(attractionData),
//         });
//       }
//       fetchAttractions();
//       resetForm();
//     } catch (error) {
//       console.error('Error saving attraction:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-4">
//       <h2 className="text-xl font-bold mb-4">
//         {selectedAttraction ? 'Edit Attraction' : 'Add New Attraction'}
//       </h2>
//       <div className="mb-2">
//         <label htmlFor="attraction_name" className="block font-bold mb-1">
//           Attraction Name
//         </label>
//         <input
//           type="text"
//           id="attraction_name"
//           name="attraction_name"
//           value={attractionData.attraction_name}
//           onChange={(e) =>
//             setAttractionData({ ...attractionData, attraction_name: e.target.value })
//           }
//           required
//           className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//         />
//       </div>
//       <div className="mb-2">
//         <label htmlFor="description" className="block font-bold mb-1">
//           Description
//         </label>
//         <textarea
//           id="description"
//           name="description"
//           value={attractionData.description}
//           onChange={(e) =>
//             setAttractionData({ ...attractionData, description: e.target.value })
//           }
//           required
//           className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//         ></textarea>
//       </div>
//       <div className="mb-2">
//         <label htmlFor="image_1" className="block font-bold mb-1">
//           Image 1 URL
//         </label>
//         <input
//           type="text"
//           id="image_1"
//           name="image_1"
//           value={attractionData.image_1}
//           onChange={(e) => setAttractionData({ ...attractionData, image_1: e.target.value })}
//           className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//         />
//       </div>
//       <div className="mb-2">
//         <label htmlFor="image_2" className="block font-bold mb-1">
//           Image 2 URL
//         </label>
//         <input
//           type="text"
//           id="image_2"
//           name="image_2"
//           value={attractionData.image_2}
//           onChange={(e) => setAttractionData({ ...attractionData, image_2: e.target.value })}
//           className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//         />
//       </div>
//       <div className="mb-2">
//         <label htmlFor="image_3" className="block font-bold mb-1">
//           Image 3 URL
//         </label>
//         <input
//           type="text"
//           id="image_3"
//           name="image_3"
//           value={attractionData.image_3}
//           onChange={(e) => setAttractionData({ ...attractionData, image_3: e.target.value })}
//           className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//         />
//       </div>
//       <div className="mb-2">
//         <label htmlFor="image_4" className="block font-bold mb-1">
//           Image 4 URL
//         </label>
//         <input
//           type="text"
//           id="image_4"
//           name="image_4"
//           value={attractionData.image_4}
//           onChange={(e) => setAttractionData({ ...attractionData, image_4: e.target.value })}
//           className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//         />
//       </div>
//       <div className="mb-2">
//         <label htmlFor="deadline" className="block font-bold mb-1">
//           Deadline
//         </label>
//         <input
//           type="datetime-local"
//           id="deadline"
//           name="deadline"
//           value={attractionData.deadline}
//           onChange={(e) => setAttractionData({ ...attractionData, deadline: e.target.value })}
//           className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//         />
//       </div>
//       <div className="mb-2">
//         <label htmlFor="map_url" className="block font-bold mb-1">
//           Map URL
//         </label>
//         <input
//           type="text"
//           id="map_url"
//           name="map_url"
//           value={attractionData.map_url}
//           onChange={(e) => setAttractionData({ ...attractionData, map_url: e.target.value })}
//           className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//         />
//       </div>
//       <div className="mb-2">
//         <label htmlFor="budget" className="block font-bold mb-1">
//           Budget
//         </label>
//         <input
//           type="number"
//           id="budget"
//           name="budget"
//           value={attractionData.budget}
//           onChange={(e) => setAttractionData({ ...attractionData, budget: e.target.value })}
//           className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-200"
//         />
//       </div>
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//         {selectedAttraction ? 'Update' : 'Create'}
//       </button>
//     </form>
//   );
// };

// export default AttractionsForm;


import React, { useState, useEffect } from 'react';

const AttractionsForm = ({ selectedAttraction, fetchAttractions }) => {
  const [attractionData, setAttractionData] = useState({
    attraction_name: '',
    description: '',
    image_1: '',
    image_2: '',
    image_3: '',
    image_4: '',
    deadline: '',
    map_url: '',
    budget: '',
  });

  const [isFormVisible, setIsFormVisible] = useState(false); // State for form visibility

  useEffect(() => {
    if (selectedAttraction) {
      setAttractionData(selectedAttraction);
    } else {
      resetForm();
    }
  }, [selectedAttraction]);

  const resetForm = () => {
    setAttractionData({
      attraction_name: '',
      description: '',
      image_1: '',
      image_2: '',
      image_3: '',
      image_4: '',
      deadline: '',
      map_url: '',
      budget: '',
    });
  };

  const handleToggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedAttraction) {
        await fetch(`/attractions/${selectedAttraction.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(attractionData),
        });
      } else {
        await fetch('/attractions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(attractionData),
        });
      }
      fetchAttractions();
      resetForm();
    } catch (error) {
      console.error('Error saving attraction:', error);
    }
  };


  return (
    <div>
      <button onClick={handleToggleForm} className="bg-blue-500 text-white px-4  py-2 rounded">
        Add Attraction
      </button>
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="bg-white p-4">
          <h2 className="text-xl font-bold mb-4">
        {selectedAttraction ? 'Edit Attraction' : 'Add New Attraction'}
      </h2>
      <div className="mb-2">
        <label htmlFor="attraction_name" className="block font-bold mb-1">
          Attraction Name
        </label>
        <input
          type="text"
          id="attraction_name"
          name="attraction_name"
          value={attractionData.attraction_name}
          onChange={(e) =>
            setAttractionData({ ...attractionData, attraction_name: e.target.value })
          }
          required
          className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="description" className="block font-bold mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={attractionData.description}
          onChange={(e) =>
            setAttractionData({ ...attractionData, description: e.target.value })
          }
          required
          className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-200"
        ></textarea>
      </div>
      <div className="mb-2">
        <label htmlFor="image_1" className="block font-bold mb-1">
          Image 1 URL
        </label>
        <input
          type="text"
          id="image_1"
          name="image_1"
          value={attractionData.image_1}
          onChange={(e) => setAttractionData({ ...attractionData, image_1: e.target.value })}
          className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="image_2" className="block font-bold mb-1">
          Image 2 URL
        </label>
        <input
          type="text"
          id="image_2"
          name="image_2"
          value={attractionData.image_2}
          onChange={(e) => setAttractionData({ ...attractionData, image_2: e.target.value })}
          className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="image_3" className="block font-bold mb-1">
          Image 3 URL
        </label>
        <input
          type="text"
          id="image_3"
          name="image_3"
          value={attractionData.image_3}
          onChange={(e) => setAttractionData({ ...attractionData, image_3: e.target.value })}
          className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="image_4" className="block font-bold mb-1">
          Image 4 URL
        </label>
        <input
          type="text"
          id="image_4"
          name="image_4"
          value={attractionData.image_4}
          onChange={(e) => setAttractionData({ ...attractionData, image_4: e.target.value })}
          className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="deadline" className="block font-bold mb-1">
          Deadline
        </label>
        <input
          type="datetime-local"
          id="deadline"
          name="deadline"
          value={attractionData.deadline}
          onChange={(e) => setAttractionData({ ...attractionData, deadline: e.target.value })}
          className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="map_url" className="block font-bold mb-1">
          Map URL
        </label>
        <input
          type="text"
          id="map_url"
          name="map_url"
          value={attractionData.map_url}
          onChange={(e) => setAttractionData({ ...attractionData, map_url: e.target.value })}
          className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="budget" className="block font-bold mb-1">
          Budget
        </label>
        <input
          type="number"
          id="budget"
          name="budget"
          value={attractionData.budget}
          onChange={(e) => setAttractionData({ ...attractionData, budget: e.target.value })}
          className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        {selectedAttraction ? 'Update' : 'Create'}
      </button>
        </form>
      )}
    </div>
  );
};

export default AttractionsForm;

