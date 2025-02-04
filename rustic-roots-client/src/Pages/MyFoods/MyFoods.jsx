import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import axios from 'axios';

const MyFoods = () => {
  const { user } = useAuth();
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { email } = user || {};

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch(`https://rustic-roots-server.vercel.app/foods?email=${email}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch foods');
        }
        
        const data = await response.json();
        setFoods(data); 
      } catch (err) {
        console.error('Error fetching foods:', err);
        setError('Failed to load foods. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
  
    if (email) {
      fetchFoods();
    }
  }, [email]);


  const userFoods = foods.filter((food) => food.addedByEmail === email);

  const handleUpdate = async (foodId) => {
    try {
      navigate(`/update/${foodId}`);
    } catch (err) {
      console.error('Error navigating to update page:', err);
      Swal.fire('Error', 'Failed to navigate to the update page. Please try again.', 'error');
    }
  };

  const handleDelete = async (foodId) => {
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: 'This food item will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await axios.delete(
          `https://rustic-roots-server.vercel.app/foods/${foodId}`
        );
        if (response.status === 200) {
          Swal.fire('Deleted!', 'The food item has been deleted.', 'success');
          setFoods(foods.filter((food) => food._id !== foodId));
        } else {
          throw new Error('Failed to delete food item');
        }
      } catch (err) {
        console.error('Error deleting food:', err);
        Swal.fire('Error', 'Failed to delete the food item. Please try again.', 'error');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <h2 className="text-3xl font-semibold mb-6">My Added Foods</h2>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userFoods.length > 0 ? (
            userFoods.map((food) => (
              <article key={food._id} className="card w-full bg-white shadow-lg p-4">
                <img
                  src={food.foodImage}
                  alt={`Image of ${food.foodName}`}
                  className="w-full h-32 object-cover mb-4 rounded"
                />
                <h3 className="text-gray-800 font-semibold text-lg">{food.foodName}</h3>
                <p className="text-gray-500">{food.foodCategory}</p>
                <p className="text-gray-700">Price: ${food.price}</p>
                <p className="text-gray-500">Quantity: {food.quantity}</p>
                <div className="mt-4 flex justify-between">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleUpdate(food._id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(food._id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p>No food items found. Start adding some!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyFoods;
